import express from "express";
import {
  createChat,
  deleteChat,
  getChatById,
  getChats,
  updateChat,
  getUsersWithChats,
  getChatsByUser,
  replyToUserChat,
} from "../controller/ChatApp.js";
import { verifyUser, superAdminOnly } from "../middleware/AuthUser.js";
import {
  getAllChatDetails,
  getChatDetailsByRoomId,
  postChat,
} from "../controller/ChatDetail.js";
import { createChatRoom, getAllChatRooms } from "../controller/ChatRoom.js";

const router = express.Router();

// Rute untuk mengakses dan menambahkan chat
router.get("/chat", verifyUser, getChats);
router.get("/chat/:id", verifyUser, getChatById);
router.post("/chat", verifyUser, createChat);

// Hanya admin yang bisa memperbarui dan menghapus chat
router.patch("/chat/:id", verifyUser, superAdminOnly, updateChat);
router.delete("/chat/:id", verifyUser, superAdminOnly, deleteChat);

// Rute untuk mendapatkan daftar user yang memiliki chat
router.get("/chats/users", verifyUser, superAdminOnly, getUsersWithChats);

// Rute untuk mendapatkan semua chat dari user tertentu
router.get("/chats/user/:userId", verifyUser, superAdminOnly, getChatsByUser);

// Rute untuk membalas chat dari user tertentu
router.post(
  "/chats/user/:userId/reply",
  verifyUser,
  superAdminOnly,
  replyToUserChat
);

router.get("/chat-rooms", verifyUser, getAllChatRooms);
router.post("/chat-room", verifyUser, createChatRoom);
router.get("/chat-details/:chatRoomId", verifyUser, getChatDetailsByRoomId);
router.get("/chat-details", verifyUser, getAllChatDetails);
router.post("/chat-details", verifyUser, postChat);

export default router;
