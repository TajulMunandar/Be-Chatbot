import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UsersModel.js"; // Pastikan path ini benar
const { DataTypes } = Sequelize;

const Intent = db.define('intent', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    intent_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 100],
            notEmpty: true
        }
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
}, {
    freezeTableName: true,
    timestamps: false, // Jika Anda tidak menggunakan timestamps
    underscored: true, // Sesuaikan dengan gaya penamaan kolom di database Anda
});

// Definisikan asosiasi
// Products.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });
Users.hasMany(Intent);
Intent.belongsTo(Users,{foreignKey: 'userId'});

export default Intent;