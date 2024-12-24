import ChatDetail from "../models/ChatDetailModel.js";
import Users from "../models/UsersModel.js";

export const getChatDetailsByRoomId = async (req, res) => {
  const { chatRoomId } = req.params;
  const { userId, role } = req;

  try {
    const whereClause =
      role === "admin" ? { chatRoomId } : { chatRoomId, userId }; // User hanya melihat chat-nya saja

    const chatDetails = await ChatDetail.findAll({
      where: whereClause,
      include: [
        {
          model: Users,
          attributes: ["uuid", "name"], // Ambil informasi pengguna tertentu
        },
      ],
      order: [["timestamp", "ASC"]], // Urutkan berdasarkan waktu
    });

    res.status(200).json(chatDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllChatDetails = async (req, res) => {
  const { userId, role } = req;

  try {
    const whereClause = role === "admin" ? {} : { userId }; // User hanya melihat chat-nya sendiri

    const chatDetails = await ChatDetail.findAll({
      where: whereClause,
      include: [
        {
          model: ChatRoom,
          attributes: ["uuid", "name"],
        },
        {
          model: Users,
          attributes: ["uuid", "name"],
        },
      ],
      order: [["timestamp", "ASC"]],
    });

    res.status(200).json(chatDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postChat = async (req, res) => {
  const { chatRoomId, userId, message } = req.body;

  // Validasi input
  if (!chatRoomId || !userId || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const chat = await ChatDetail.create({
      chatRoomId,
      userId,
      message,
    });
    res.status(201).json({
      message: "Chat successfully posted.",
      chat,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
