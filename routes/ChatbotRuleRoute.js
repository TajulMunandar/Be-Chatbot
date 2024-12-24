import express from "express";
import { 
    getChatbotRules, 
    getChatbotRulesById, 
    createChatbotRules, 
    updateChatbotRules, 
    deleteChatbotRules,
    getIntents,          // Menambahkan route untuk mendapatkan daftar intents
    getQuestionsByIntent // Menambahkan route untuk mendapatkan daftar pertanyaan berdasarkan intent
} from "../controller/ChatbotRules.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

// Route utama untuk chatbot rules
router.get("/chatbotrules", verifyUser, getChatbotRules);
router.get("/chatbotrulesById/:id", verifyUser, getChatbotRulesById);
router.post("/chatbotrules", verifyUser, createChatbotRules);
router.patch("/chatbotrules/:id", verifyUser, updateChatbotRules);
router.delete("/chatbotrules/:id", verifyUser, deleteChatbotRules);

// Route tambahan untuk intents dan pertanyaan terkait intent
router.get("/intents", getIntents); // Route untuk mendapatkan daftar intents
router.get("/questions/:intent", getQuestionsByIntent); // Route untuk mendapatkan pertanyaan berdasarkan intent

export default router;
