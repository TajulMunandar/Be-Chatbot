import express from "express";
import { createDefaultResponse,getDefaultResponseById , getAllDefaultResponses, deleteDefaultResponse, updateDefaultResponse } from "../controller/default_responses.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.post("/defaultresponse", verifyUser, createDefaultResponse);
router.get("/defaultresponses", verifyUser, getAllDefaultResponses);
router.get("/defaultresponse/:id", verifyUser, getDefaultResponseById); 
router.delete("/defaultresponse/:id", verifyUser, deleteDefaultResponse);
router.patch("/defaultresponse", verifyUser, updateDefaultResponse);

export default router;
