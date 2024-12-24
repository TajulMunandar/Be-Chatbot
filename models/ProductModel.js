import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UsersModel.js"; // Pastikan path ini benar
const { DataTypes } = Sequelize;

const Products = db.define('product', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 100],
            notEmpty: true
        }
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true,
    timestamps: false, // Jika Anda tidak menggunakan timestamps
    underscored: true, // Sesuaikan dengan gaya penamaan kolom di database Anda
});

// Definisikan asosiasi
// Products.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });
Users.hasMany(Products);
Products.belongsTo(Users,{foreignKey: 'userId'});

export default Products;