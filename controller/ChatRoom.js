import ChatRoom from "../models/ChatRoomModel.js";

export const getAllChatRooms = async (req, res) => {
  const { userId, role } = req;

  try {
    if (role === "admin") {
      // Admin melihat semua room
      const chatRooms = await ChatRoom.findAll({
        attributes: ["uuid", "name", "description"],
        order: [["name", "ASC"]],
      });
      return res.status(200).json(chatRooms);
    }

    // User hanya melihat room yang memiliki chat-nya
    const chatRooms = await ChatRoom.findAll({
      attributes: ["uuid", "name", "description"],
      include: [
        {
          model: ChatDetail,
          where: { userId },
          attributes: [], // Hanya untuk join, tidak mengambil field
        },
      ],
      order: [["name", "ASC"]],
    });

    res.status(200).json(chatRooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
