import ChatDetail from "../models/ChatDetailModel.js";
import ChatRoom from "../models/ChatRoomModel.js";
import Users from "../models/UsersModel.js";

export const getAllChatRooms = async (req, res) => {
  const { userId, role } = req;
  console.log("User ID:", userId); // Log userId
  console.log("Role:", role); // Log role

  try {
    if (role === "admin") {
      // Admin melihat semua room
      const chatRooms = await ChatRoom.findAll({
        attributes: ["uuid", "name", "description"],
        order: [["name", "ASC"]],
        include: [
          {
            model: ChatDetail,
            attributes: ["userId"], // Mengambil userId dari ChatDetail
            include: [
              {
                model: Users,
                attributes: ["id", "name", "email"], // Menambahkan informasi user
              },
            ],
          },
        ],
      });

      const roomsWithUserNames = chatRooms.map((room) => {
        const user = room.chat_details[0]?.user; // Ambil user pertama (bisa lebih dari satu chat detail)
        return {
          ...room.toJSON(),
          userName: user ? user.name : "Unknown User", // Menambahkan userName
          userId: user ? user.id : "Unknown User", // Menambahkan userName
        };
      });

      return res.status(200).json(roomsWithUserNames);
    }

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

    console.log("Fetched chat rooms:", chatRooms);

    res.status(200).json(chatRooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createChatRoom = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.userId; // Dapatkan userId dari middleware

  // Validasi input
  if (!name || !description) {
    return res
      .status(400)
      .json({ message: "Room name and description are required." });
  }

  try {
    // Membuat room baru
    const newRoom = await ChatRoom.create({
      name,
      description,
    });

    // Mengembalikan response sukses
    res.status(201).json({
      message: "Chat room created successfully.",
      room: newRoom,
    });
  } catch (error) {
    console.error("Error creating chat room:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
