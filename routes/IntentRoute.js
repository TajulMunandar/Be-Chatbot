import express from "express";
import { createIntent,deleteIntent,getIntent,getIntentById,updateIntent } from "../controller/IntentController.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.post("/intent", verifyUser, createIntent);
router.get("/intent", verifyUser, getIntent);
router.get("/intent/:id", verifyUser, getIntentById); 
router.delete("/intent/:id", verifyUser, deleteIntent);
router.patch("/intent", verifyUser, updateIntent);

export default router;
