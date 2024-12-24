import Fuse from 'fuse.js';
import chatbotRules from "../models/ChatbotRulesModel.js";
import defaultResponses from "../models/DefaultResponsesModel.js"; // Model baru untuk respons default

export const handleChatbotRequest = async (req, res) => {
    // Normalisasi input dari pengguna
    const userInput = normalizeInput(req.body.message);

    try {
        // Ambil semua aturan chatbot dari database
        const rules = await chatbotRules.findAll();

        // Cek apakah data chatbotRules ditemukan
        if (!rules || rules.length === 0) {
            // Jika tidak ada aturan, langsung gunakan respons default
            return sendDefaultResponse(res);
        }

        // Format rules untuk Fuse.js, memisahkan keyword menjadi array
        const formattedRules = rules.map(rule => ({
            keywords: rule.keywords.split(',').map(keyword => keyword.trim().toLowerCase()), // Pisahkan keywords dengan koma
            answer: rule.answer
        }));

        // Gunakan Fuse.js untuk pencarian fuzzy pada keyword
        const fuse = new Fuse(formattedRules, {
            keys: ['keywords'],  // Kunci pencarian berdasarkan keywords array
            threshold: 0.5      // Pengaturan sensitivitas fuzzy
        });

        // Cari kecocokan dengan input pengguna
        const result = fuse.search(userInput);

        if (result.length > 0) {
            // Jika ada kecocokan, ambil jawaban yang sesuai
            const matchedRule = result[0].item;
            return res.status(200).json({ answer: matchedRule.answer });
        }

        // Jika tidak ada kecocokan, berikan respons default
        return sendDefaultResponse(res);

    } catch (error) {
        console.error(error);
        // Tangani kesalahan jika ada masalah saat mengakses database atau logika lainnya
        return res.status(500).json({ msg: "Terjadi kesalahan saat menangani permintaan." });
    }
};

// Fungsi untuk mengirim respons default dari database atau fallback jika tidak ada di database
const sendDefaultResponse = async (res) => {
    try {
        // Ambil respons default dari database
        const defaultResponse = await defaultResponses.findOne({ where: { id: 1 } });

        if (defaultResponse) {
            // Jika respons default ditemukan
            return res.status(200).json({ answer: defaultResponse.response });
        } else {
            // Jika respons default tidak ditemukan di database
            return res.status(200).json({ answer: "Maaf, saya tidak mengerti pertanyaan Anda." });
        }
    } catch (error) {
        console.error(error);
        // Jika ada masalah saat mengakses tabel default response
        return res.status(500).json({ msg: "Terjadi kesalahan saat mengambil respons default." });
    }
};

// Fungsi untuk normalisasi input pengguna (misalnya untuk menghapus spasi, huruf besar, dll.)
function normalizeInput(input) {
    return input.trim().toLowerCase();
}
