import ChatApp from "../models/ChatRoomModel.js";
import User from "../models/UsersModel.js";
import { Op } from "sequelize";
export const getChats = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      // Admin dapat melihat semua chat, baik dari user maupun admin
      response = await ChatApp.findAll({
        attributes: ["uuid", "message"],
        include: [
          {
            model: User,
            attributes: ["name", "email"], // Menampilkan info user bagi admin
          },
        ],
      });
    } else {
      // User hanya bisa melihat chat milik mereka sendiri, termasuk balasan admin tanpa identitas admin
      response = await ChatApp.findAll({
        attributes: ["uuid", "message"],
        where: { userId: req.userId },
        include: [
          {
            model: User,
            attributes: [], // Mengosongkan informasi admin pada sisi user
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getChatById = async (req, res) => {
  try {
    const chat = await ChatApp.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!chat) return res.status(404).json({ msg: "Chat not found" });

    let response;
    if (req.role === "admin") {
      // Admin dapat melihat chat mana pun
      response = await ChatApp.findOne({
        attributes: ["uuid", "message"],
        where: { id: chat.id },
        include: [
          {
            model: User,
            attributes: ["name", "email"], // Admin melihat info user
          },
        ],
      });
    } else {
      // User hanya bisa melihat chat milik mereka sendiri
      response = await ChatApp.findOne({
        attributes: ["uuid", "message"],
        where: {
          [Op.and]: [{ id: chat.id }, { userId: req.userId }],
        },
        include: [
          {
            model: User,
            attributes: [], // Mengosongkan informasi admin pada sisi user
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createChat = async (req, res) => {
  const { message } = req.body;
  try {
    await ChatApp.create({
      message: message,
      userId: req.userId, // Terkait dengan user yang sedang login
    });
    res.status(201).json({ msg: "Message sent" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateChat = async (req, res) => {
  try {
    const chat = await ChatApp.findOne({
      where: { uuid: req.params.id },
    });
    if (!chat) return res.status(404).json({ msg: "Chat not found" });

    const { message } = req.body;

    // Hanya admin atau user yang memiliki pesan dapat mengedit pesan tersebut
    if (req.role === "admin" || req.userId === chat.userId) {
      await ChatApp.update(
        { message },
        {
          where: { id: chat.id },
        }
      );
      return res.status(200).json({ msg: "Message updated" });
    } else {
      return res.status(403).json({ msg: "You are not authorized" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const chat = await ChatApp.findOne({
      where: { uuid: req.params.id },
    });
    if (!chat) return res.status(404).json({ msg: "Chat not found" });

    // Hanya admin atau user yang memiliki pesan dapat menghapus pesan tersebut
    if (req.role === "admin" || req.userId === chat.userId) {
      await ChatApp.destroy({
        where: { id: chat.id },
      });
      return res.status(200).json({ msg: "Message deleted" });
    } else {
      return res.status(403).json({ msg: "You are not authorized" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const replyToUserChat = async (req, res) => {
  const { message } = req.body;
  const userId = req.params.userId; // Ambil userId dari parameter URL

  try {
    // Cek apakah userId valid
    const user = await User.findOne({ where: { uuid: userId } });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Ambil role dan nama dari data user
    const senderRole = user.role; // Ambil role dari data user
    const senderName = user.name; // Ambil nama dari data user

    // Simpan balasan chat
    const newChat = await ChatApp.create({
      message: message,
      userId: user.id, // Pastikan userId valid
    });

    // Kirimkan informasi chat yang mencakup nama dan role pengirim
    const responseChat = {
      message: newChat.message,
      userId: user.id, // userId yang benar
      role: senderRole, // Role pengirim yang diambil dari data user
      user: { name: senderName }, // Nama pengirim yang diambil dari data user
    };

    res.status(201).json({ msg: "Reply sent", chat: responseChat });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getUsersWithChats = async (req, res) => {
  try {
    const usersWithChats = await User.findAll({
      attributes: ["uuid", "name", "email"],
      include: [
        {
          model: ChatApp,
          attributes: ["uuid"],
          required: true, // Hanya ambil user yang memiliki chat
        },
      ],
      where: { role: "user" }, // Memastikan hanya user yang memiliki chat, bukan admin
    });
    res.status(200).json(usersWithChats);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Mendapatkan chat antara admin dan user berdasarkan user ID
export const getChatsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    // Cek apakah user dengan userId ini ada
    const user = await User.findOne({
      where: { uuid: userId },
      attributes: ["uuid", "name", "role"], // Tambahkan atribut `name` di sini
      include: [
        {
          model: ChatApp,
          attributes: ["uuid", "message", "user_id"],
          order: [["id", "ASC"]], // Urutkan berdasarkan waktu
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ msg: "No chats found for this user" });
    }

    const chatsWithUserInfo = user.chat_apps.map((chat) => ({
      ...chat.dataValues,
      user: { name: user.name, role: user.role }, // Menambahkan info user ke chat
    }));

    // Kirimkan user dan data chat
    res.status(200).json({
      name: user.name, // Kirim nama pengguna
      role: user.role, // Kirim nama pengguna
      chats: chatsWithUserInfo, // Kirimkan data chat yang sudah diupdate
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};
