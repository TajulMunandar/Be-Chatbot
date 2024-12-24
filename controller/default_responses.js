import User from "../models/UsersModel.js";
import defaultResponses from "../models/DefaultResponsesModel.js";
import { Op } from 'sequelize';

// Create default response (for admin only)
export const createDefaultResponse = async (req, res) => {
    if (req.role !== "admin") {
        return res.status(403).json({ msg: "Only admins can create default responses." });
    }

    const { response } = req.body;
    try {
        // Cek apakah sudah ada data default
        const existingResponse = await defaultResponses.findOne();
        if (existingResponse) {
            return res.status(400).json({ msg: "Default response already exists, please update the existing one." });
        }
        // Jika belum ada, buat data baru
        await defaultResponses.create({
            response,
            created_at: new Date(),
        });
        res.status(201).json({ msg: "Default Response Created" });
    } catch (error) {
        console.error("Error creating default response:", error);
        res.status(400).json({ msg: error.message });
    }
};

// Get the default response (accessible to all users)
export const getDefaultResponse = async (req, res) => {
    try {
        const response = await defaultResponses.findOne({
            attributes: ['uuid', 'response', 'created_at']
        });
        if (!response) return res.status(404).json({ msg: "No default response found" });
        res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching default response:", error);
        res.status(500).json({ msg: error.message });
    }
};

// Update default response (for admin only)
// export const updateDefaultResponse = async (req, res) => {
//     if (req.role !== "admin") {
//         return res.status(403).json({ msg: "Only admins can update default responses." });
//     }

//     try {
//         const response = await defaultResponses.findOne(); // Mengambil satu respons
//         if (!response) return res.status(404).json({ msg: "Default response not found" });

//         const { response: updatedResponse } = req.body;
//         await response.update({ response: updatedResponse || response.response });
//         res.status(200).json({ msg: "Default Response Updated" });
//     } catch (error) {
//         console.error("Error updating default response:", error);
//         res.status(500).json({ msg: error.message });
//     }
// };


// Update default response tanpa UUID
export const updateDefaultResponse = async (req, res) => {
    if (req.role !== "admin") {
        return res.status(403).json({ msg: "Only admins can update default responses." });
    }

    try {
        // Ambil default response yang ada, tanpa membutuhkan UUID dari frontend
        const response = await defaultResponses.findOne(); 
        if (!response) return res.status(404).json({ msg: "Default response not found" });

        // Ambil response baru dari body request
        const { response: updatedResponse } = req.body;
        
        // Update dengan data baru atau tetap pakai yang lama jika tidak ada perubahan
        await response.update({ response: updatedResponse || response.response });
        res.status(200).json({ msg: "Default Response Updated" });
    } catch (error) {
        console.error("Error updating default response:", error);
        res.status(500).json({ msg: error.message });
    }
};



// Delete default response (for admin only)
export const deleteDefaultResponse = async (req, res) => {
    if (req.role !== "admin") {
        return res.status(403).json({ msg: "Only admins can delete default responses." });
    }

    try {
        const response = await defaultResponses.findOne(); // Mengambil satu respons
        if (!response) return res.status(404).json({ msg: "Default response not found" });

        await response.destroy();
        res.status(200).json({ msg: "Default Response Deleted" });
    } catch (error) {
        console.error("Error deleting default response:", error);
        res.status(500).json({ msg: error.message });
    }
};

// Get all default responses (for admin, though there should be only one response)
export const getAllDefaultResponses = async (req, res) => {
    if (req.role !== "admin") {
        return res.status(403).json({ msg: "Only admins can view all default responses." });
    }

    try {
        const response = await defaultResponses.findAll({
            attributes: ['uuid', 'response', 'created_at']
        });
        res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching all default responses:", error);
        res.status(500).json({ msg: error.message });
    }
};

export const getDefaultResponseById = async (req, res) => {
    const { id } = req.params; // id di sini sebenarnya adalah uuid

    try {
        const response = await defaultResponses.findOne({
            where: { uuid: id }, // Menggunakan uuid untuk pencarian
            attributes: ['uuid', 'response', 'created_at']
        });
        if (!response) return res.status(404).json({ msg: "Default response not found" });

        res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching default response by ID:", error);
        res.status(500).json({ msg: error.message });
    }
};
