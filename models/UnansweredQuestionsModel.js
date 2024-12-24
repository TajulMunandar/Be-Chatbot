import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UsersModel.js"; // Pastikan path ini benar

const { DataTypes } = Sequelize;

const unansweredQuestions = db.define('unanswered_questions', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    question: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, {
    freezeTableName: true,
    timestamps: false,
    underscored: true,
});

// Relasi
Users.hasMany(unansweredQuestions);
unansweredQuestions.belongsTo(Users, { foreignKey: 'user_id' });

export default unansweredQuestions;
