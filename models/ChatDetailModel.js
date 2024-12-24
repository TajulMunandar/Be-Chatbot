import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import ChatRoom from "./ChatRoomModel.js"; // Pastikan path benar
import Users from "./UsersModel.js"; // Pastikan path benar

const { DataTypes } = Sequelize;

const ChatDetail = db.define(
  "chat_detail",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    chatRoomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    underscored: true,
  }
);

// Asosiasi dengan ChatRoom dan Users
ChatDetail.belongsTo(ChatRoom, { foreignKey: "chatRoomId" });
ChatRoom.hasMany(ChatDetail, { foreignKey: "chatRoomId" });

ChatDetail.belongsTo(Users, { foreignKey: "userId" });
Users.hasMany(ChatDetail, { foreignKey: "userId" });

export default ChatDetail;
