import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const ChatRoom = db.define(
  "chat_room",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true, // Opsional untuk deskripsi ruang obrolan
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    underscored: true,
  }
);

export default ChatRoom;
