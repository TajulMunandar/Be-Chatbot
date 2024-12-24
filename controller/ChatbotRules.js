

import ChatbotRules from "../models/ChatbotRulesModel.js";
import User from "../models/UsersModel.js";
import DefaultResponse from "../models/DefaultResponsesModel.js";
import { Op } from "sequelize";
import leven from "leven"; // Library untuk fuzzy matching
import Intent from "../models/IntentModel.js";
// Fungsi untuk menghitung skor kecocokan
const calculateMatchScore = (input, keywords, threshold) => {
    const normalizedInput = input.toLowerCase();
    const keywordArray = keywords.split(",").map((k) => k.trim().toLowerCase());
    let score = 0;

    for (let keyword of keywordArray) {
        // Cocokkan kata kunci secara lengkap
        if (normalizedInput.includes(keyword)) {
            score += 2; // Bobot tinggi untuk kecocokan lengkap
        }
        // Fuzzy matching
        else if (
            leven(keyword, normalizedInput) / Math.max(keyword.length, normalizedInput.length) <= threshold
        ) {
            score += 1; // Bobot lebih rendah untuk kecocokan fuzzy
        }
    }

    return score;
};

// Fungsi untuk memvalidasi kata kunci
const validateKeywords = (keywords) => {
    const uniqueKeywords = new Set(keywords);
    return uniqueKeywords.size === keywords.length;
};
// Controller utama untuk mendapatkan respons dari chatbot rules
export const getChatbotRules = async (req, res) => {
    try {
        // Ambil semua aturan dari database
        const rules = await ChatbotRules.findAll({
            attributes: ["uuid", "keywords", "answer", "question", "fuzzy_threshold"],
            include: [
                {
                    model: Intent,
                    attributes: ["intent_name"], // Ambil intent_name dari tabel Intent
                },
                {
                    model: User,
                    attributes: ["name", "email"],
                },
            ],
            where: req.role === "admin" ? {} : { user_id: req.userId },
        });

        // Ambil input dari pengguna
        const userInput = req.query.question || req.body.question;

        if (userInput) {
            console.log("User input:", userInput);

            let bestMatch = null;
            let highestScore = 0;

            // Evaluasi setiap aturan untuk mencari kecocokan terbaik
            for (let rule of rules) {
                const score = calculateMatchScore(userInput, rule.keywords, rule.fuzzy_threshold);
                if (score > highestScore) {
                    highestScore = score;
                    bestMatch = rule;
                }
            }

            if (bestMatch) {
                console.log("Best match found:", bestMatch.answer);
                return res.status(200).json({ answer: bestMatch.answer });
            }

            // Jika tidak ada kecocokan, gunakan respons default
            const defaultResponse = await DefaultResponse.findOne({ where: { type: "default" } });
            if (defaultResponse) {
                console.log("Default response:", defaultResponse.answer);
                return res.status(200).json({ answer: defaultResponse.answer });
            }

            return res.status(200).json({ answer: "Maaf, saya tidak memahami pertanyaan Anda." });
        }

        // Jika tidak ada input pengguna, kembalikan semua aturan
        res.status(200).json(rules);
    } catch (error) {
        console.error("Error in getChatbotRules:", error);
        res.status(500).json({ msg: error.message });
    }
};

export const getIntents = async (req, res) => {
    try {
      const intents = await ChatbotRules.findAll({
        include: {
          model: Intent,
          attributes: ['intent_name'],
        },
        attributes: [], // Hanya ambil intent_name dari tabel Intent
      });
  
      const formattedIntents = intents.map(item => item.intent.intent_name); // Ambil intent_name dari relasi
  
      res.status(200).json(formattedIntents);
    } catch (error) {
      console.error('Error fetching intents from rules:', error);
      res.status(500).json({ msg: 'Gagal memuat intents.' });
    }
  };
  


// Controller untuk mendapatkan daftar pertanyaan berdasarkan intent
export const getQuestionsByIntent = async (req, res) => {
    try {
        const intent_name = req.params.intent_name;

        // Validasi intent_name
        if (!intent_name) {
            return res.status(400).json({ msg: "Intent name is required." });
        }

        const rules = await ChatbotRules.findAll({
            include: [
                {
                    model: Intent,
                    where: { intent_name }, // Filter berdasarkan intent_name
                    attributes: [],
                },
            ],
            attributes: ["uuid", "question", "answer"],
        });

        if (!rules.length) {
            return res.status(404).json({ msg: "Tidak ada pertanyaan untuk intent ini." });
        }

        res.status(200).json(rules);
    } catch (error) {
        res.status(500).json({ msg: "Gagal memuat pertanyaan. Periksa log backend untuk detail." });
    }
};



export const createChatbotRules = async (req, res) => {
    const { intent_name, keywords, answer, question, fuzzy_threshold } = req.body; // Menggunakan intent_name

    try {
        if (!intent_name || !keywords || !answer || !question) {
            return res.status(400).json({ msg: "Intent_name, keywords, answer, and question cannot be null." });
        }

        // Validasi intent_name dari tabel Intent
        const intent = await Intent.findOne({ where: { intent_name } }); // Mencari berdasarkan intent_name
        if (!intent) {
            return res.status(400).json({ msg: "Intent_name tidak valid." });
        }

        const keywordArray = keywords.split(",").map((k) => k.trim());
        const isValid = validateKeywords(keywordArray);

        if (!isValid) {
            return res.status(400).json({ msg: "Duplicate keywords found." });
        }

        if (fuzzy_threshold < 0 || fuzzy_threshold > 1) {
            return res.status(400).json({ msg: "Fuzzy threshold must be between 0 and 1." });
        }

        await ChatbotRules.create({
            intent_id: intent.id, // Menyimpan ID intent berdasarkan intent_name
            keywords: keywordArray.join(","),
            answer,
            question,
            fuzzy_threshold,
            user_id: req.userId,
        });

        res.status(201).json({ msg: "Chatbot rule created successfully." });
    } catch (error) {
        console.error("Error in createChatbotRules:", error);
        res.status(400).json({ msg: error.message });
    }
};


// Controller untuk memperbarui aturan chatbot
export const updateChatbotRules = async (req, res) => {
    const { intent_name, keywords, answer, question, fuzzy_threshold } = req.body;

    try {
        const chatbotRule = await ChatbotRules.findOne({
            where: { uuid: req.params.id },
        });

        if (!chatbotRule) return res.status(404).json({ msg: "Chatbot rule not found." });

        // Validasi intent_name
        if (intent_name) {
            const intent = await Intent.findOne({ where: { intent_name } });
            if (!intent) {
                return res.status(400).json({ msg: "Intent_name tidak valid." });
            }
            chatbotRule.intent_id = intent.id;
        }
        

        if (keywords) {
            const keywordArray = keywords.split(",").map((k) => k.trim());
            console.log('Backend received keyword array:', keywordArray);
          
            const uniqueKeywords = Array.from(new Set(keywordArray));
          
            if (uniqueKeywords.length !== keywordArray.length) {
              console.log('Duplicate keywords detected:', keywordArray);
              return res.status(400).json({ msg: "Duplicate keywords found." });
            }
          
            chatbotRule.keywords = uniqueKeywords.join(",");
        }
        
        if (answer) chatbotRule.answer = answer;

        // Update question
        if (question) {
            chatbotRule.question = question;
        }

        if (fuzzy_threshold !== undefined) {
            if (fuzzy_threshold < 0 || fuzzy_threshold > 1) {
                return res.status(400).json({ msg: "Fuzzy threshold must be between 0 and 1." });
            }
            chatbotRule.fuzzy_threshold = fuzzy_threshold;
        }

        await chatbotRule.save();
        res.status(200).json({ msg: "Chatbot rule updated successfully." });
    } catch (error) {
        console.error("Error in updateChatbotRules:", error);
        res.status(500).json({ msg: error.message });
    }
};

// Controller untuk menghapus aturan chatbot
export const deleteChatbotRules = async (req, res) => {
    try {
        const chatbotRule = await ChatbotRules.findOne({
            where: { uuid: req.params.id },
        });

        if (!chatbotRule) return res.status(404).json({ msg: "Chatbot rule not found." });

        await chatbotRule.destroy();
        res.status(200).json({ msg: "Chatbot rule deleted successfully." });
    } catch (error) {
        console.error("Error in deleteChatbotRules:", error);
        res.status(500).json({ msg: error.message });
    }
};



// Controller untuk mendapatkan chatbot rule berdasarkan ID
// Controller untuk mendapatkan chatbot rule berdasarkan ID
export const getChatbotRulesById = async (req, res) => {
    try {
        const chatbotRule = await ChatbotRules.findOne({
            where: { uuid: req.params.id },
            include: [
                {
                    model: Intent,
                    attributes: ["intent_name"], // Ambil intent_name dari tabel Intent
                },
            ],
        });

        if (!chatbotRule) return res.status(404).json({ msg: "Chatbot rule not found." });

        res.status(200).json(chatbotRule);
    } catch (error) {
        console.error("Error in getChatbotRulesById:", error);
        res.status(500).json({ msg: error.message });
    }
};