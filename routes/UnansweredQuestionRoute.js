import { createUnansweredQuestion, getAllUnansweredQuestions, deleteUnansweredQuestion, updateUnansweredQuestion } from "../controller/unanswered_questions.js";
import { verifyUser } from "../middleware/AuthUser.js";
import express from "express";


const router = express.Router();

router.post("/unansweredquestion",verifyUser,  createUnansweredQuestion);
router.get("/unansweredquestions",verifyUser, getAllUnansweredQuestions);
router.delete("/unansweredquestion/:id", verifyUser,deleteUnansweredQuestion);
router.patch("/unansweredquestion/:id", verifyUser, updateUnansweredQuestion);


export default router;
