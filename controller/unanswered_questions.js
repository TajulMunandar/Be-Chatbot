    import User from "../models/UsersModel.js";
    // import UnansweredQuestions from "../models/UnansweredQuestionsModel.js";

    import { Op } from 'sequelize';

    // Create unanswered question
    export const createUnansweredQuestion = async (req, res) => {
        const { question } = req.body;
        try {
            await UnansweredQuestions.create({
                question,
                userId: req.userId, // Menyimpan ID user yang mengajukan pertanyaan
                created_at: new Date(),
            });
            res.status(201).json({ msg: "Unanswered Question Created" });
        } catch (error) {
            console.error("Error creating unanswered question:", error);
            res.status(400).json({ msg: error.message });
        }
    };

    // Get all unanswered questions
    export const getAllUnansweredQuestions = async (req, res) => {
        try {
            let response;
            if (req.role === "admin") {
                response = await UnansweredQuestions.findAll({
                    attributes: ['id', 'question', 'created_at'],
                    include: [{
                        model: User,
                        attributes: ['name', 'email']
                    }]
                });
            } else {
                response = await UnansweredQuestions.findAll({
                    attributes: ['id', 'question', 'created_at'],
                    where: {
                        userId: req.userId
                    },
                    include: [{
                        model: User,
                        attributes: ['name', 'email']
                    }]
                });
            }
            res.status(200).json(response);
        } catch (error) {
            console.error("Error fetching unanswered questions:", error);
            res.status(500).json({ msg: error.message });
        }
    };

    // Update unanswered question
    export const updateUnansweredQuestion = async (req, res) => {
        try {
            const question = await UnansweredQuestions.findOne({ where: { id: req.params.id } });
            if (!question) return res.status(404).json({ msg: "Unanswered question not found" });

            const { question: updatedQuestion } = req.body;
            if (req.role === "admin" || req.userId === question.userId) {
                await question.update({ question: updatedQuestion || question.question });
                res.status(200).json({ msg: "Unanswered Question Updated" });
            } else {
                res.status(403).json({ msg: "You are not authorized" });
            }
        } catch (error) {
            console.error("Error updating unanswered question:", error);
            res.status(500).json({ msg: error.message });
        }
    };

    // Delete unanswered question
    export const deleteUnansweredQuestion = async (req, res) => {
        try {
            const question = await UnansweredQuestions.findOne({ where: { id: req.params.id } });
            if (!question) return res.status(404).json({ msg: "Unanswered question not found" });

            if (req.role === "admin" || req.userId === question.userId) {
                await question.destroy();
                res.status(200).json({ msg: "Unanswered Question Deleted" });
            } else {
                res.status(403).json({ msg: "You are not authorized" });
            }
        } catch (error) {
            console.error("Error deleting unanswered question:", error);
            res.status(500).json({ msg: error.message });
        }
    };
