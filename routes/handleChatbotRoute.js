import express from "express";
import { handleChatbotRequest } from "../controller/HandleChatbot.js";
import { verifyUser } from "../middleware/AuthUser.js";
const router = express.Router();

router.post("/chatbot", handleChatbotRequest);

export default router;