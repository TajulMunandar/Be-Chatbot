import ChatDetail from "../models/ChatDetailModel.js";
import ChatRoom from "../models/ChatRoomModel.js";
import Users from "../models/UsersModel.js";

export const getChatDetailsByRoomId = async (req, res) => {
  const { chatRoomId } = req.params;
  const { userId, role } = req;

  try {
    const chatRoom = await ChatRoom.findOne({
      where: { uuid: chatRoomId }, // Mencocokkan dengan uuid chat room
    });

    if (!chatRoom) {
      return res.status(404).json({ message: "Chat room not found" });
    }

    const roomId = chatRoom.id;

    const chatDetails = await ChatDetail.findAll({
      where: { chatRoomId: roomId },
      include: [
        {
          model: Users,
          attributes: ["uuid", "name", "role"],
        },
        {
          model: ChatRoom,
          attributes: ["id", "uuid", "name", "description"],
        },
      ],
      order: [["timestamp", "ASC"]], // Urutkan berdasarkan waktu
    });

    const formattedChatDetails = chatDetails.map((chat) => ({
      chatRoom_id: chat.chat_room.id,
      message: chat.message,
      user: chat.user,
      timestamp: chat.timestamp,
    }));

    console.log(formattedChatDetails[0]);

    res.status(200).json({
      name: formattedChatDetails[0]?.user?.name || "Unknown User", // Menyertakan nama user untuk chat room
      chats: formattedChatDetails,
    });
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
          attributes: ["uuid", "name", "role"],
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
  const { chatRoomId, uuid, message } = req.body;

  console.log(chatRoomId);

  // Validasi input
  if (!uuid || !message) {
    return res
      .status(400)
      .json({ message: "User ID and message are required." });
  }

  try {
    const user = await Users.findOne({ where: { uuid: uuid } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let roomId = chatRoomId;
    console.log(roomId);
    console.log(user);

    let id_room;
    if (user.role === "admin") {
      // If the user's role is 'admin', search by uuid
      id_room = await ChatRoom.findOne({
        where: { uuid: roomId }, // Search by uuid for admin
      });
    } else {
      // For other roles, search by id
      id_room = await ChatRoom.findOne({
        where: { id: roomId }, // Search by id for non-admin
      });
    }

    if (!roomId) {
      // Membuat chat room baru jika tidak ada
      const newRoom = await ChatRoom.create({
        name: "Default Room", // Ganti dengan nama room yang sesuai
        description: "Default des", // Ganti dengan nama room yang sesuai
      });
      id_room = newRoom; // Mengambil ID dari room yang baru dibuat
    }

    const chat = await ChatDetail.create({
      chatRoomId: id_room.id,
      userId: user.id,
      message,
    });

    res.status(201).json({
      message: "Chat successfully posted.",
      chat,
    });
  } catch (error) {
    console.error("Error posting chat:", error);
    res.status(500).json({ message: error.message });
  }
};
