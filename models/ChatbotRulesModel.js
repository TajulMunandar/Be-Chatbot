import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UsersModel.js";
import Intent from "./IntentModel.js"; // Import model Intent
const { DataTypes } = Sequelize;

const chatbotRules = db.define('chatbot_rules', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    keywords: {  // Mengganti 'keyword' dengan 'keywords' dan mengubah tipe menjadi TEXT untuk menyimpan array
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    answer: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    fuzzy_threshold: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.5, // Menetapkan default threshold untuk fuzzy matching
        validate: {
            min: 0.0,
            max: 1.0
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
    question: {  // Menyimpan pertanyaan yang relevan
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    intent_id: {  // Menyimpan referensi ke tabel intents
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'intents',
            key: 'id'
        }
    }
}, {
    freezeTableName: true,
    timestamps: false,
    underscored: true,
});

// Relasi
Users.hasMany(chatbotRules);
chatbotRules.belongsTo(Users, { foreignKey: 'user_id' });
Intent.hasMany(chatbotRules); // Relasi antara Intent dan chatbotRules
chatbotRules.belongsTo(Intent, { foreignKey: 'intent_id' }); // Menambahkan relasi ke Intent

export default chatbotRules;
