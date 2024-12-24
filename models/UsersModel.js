import { Sequelize } from "sequelize";
import db from "../config/Database.js";


const { DataTypes } = Sequelize;

const Users = db.define(
  "users",
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
        len: [3, 100],
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    underscored: true,
  }
);

// Mendefinisikan asosiasi dengan model chatbotRules
// User.hasMany(ChatApp, { foreignKey: "userId" }); // Relasi ke banyak chat

export default Users;
