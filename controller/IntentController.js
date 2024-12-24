import Intent from "../models/IntentModel.js";
import User from "../models/UsersModel.js";
import {Op} from 'sequelize';
export const getIntent = async (req, res) => {
    try {
        let response;
        if (req.role === "admin"){
            response = await Intent.findAll({
                attributes:['uuid', 'intent_name','created_at','updated_at' ],
                include:[{
                    model:User,
                    attributes:['name','email']
                }]
            });
        } else {
            response = await Intent.findAll({
                attributes:['uuid', 'intent_name', 'created_at','updated_at'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model:User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error){
        res.status(500).json({ msg: error.message });
    }
}

export const getIntentById = async (req, res) => {    
    try {
        const intent = await Intent.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!intent) return res.status(404).json({ msg: "intent not found" });
        let response;
        if (req.role === "admin"){
            response = await Intent.findOne({
                attributes:['uuid', 'intent_name','created_at','updated_at'],
                where: {
                    id: intent.id
                },
                include:[{
                    model:User,
                    attributes:['name','email']
                }]
            });
        } else {
            response = await Intent.findOne({
                attributes:['uuid', 'intent_name','created_at','updated_at'],
                where:{
                    [Op.and]: [{id: intent.id}, {userId: req.userId}]
                },
                include:[{
                    model:User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error){
        res.status(500).json({ msg: error.message });
    }
}

export const createIntent = async (req, res) => {
    const { intent_name, created_at, updated_at } = req.body;
    try {
        await Intent.create({
            intent_name: intent_name,
            created_at: created_at,
            updated_at:updated_at,
            userId: req.userId
        });
        res.status(201).json({ msg: "intent Created" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const updateIntent = async (req, res) => {
    try {
        const intent = await Intent.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!intent) return res.status(404).json({ msg: "intent not found" });
        const { intent_name, created_at, updated_at } = req.body;
        if (req.role === "admin"){
          await Intent.update({intent_name, created_at, updated_at },{
              where:{
                id:intent.id
            }
          })
        } else {
            if(req.userId !== intent.userId) return res.status(403).json({ msg: "You are not authorized" });
          await Intent.update({intent_name, created_at, updated_at },{
                where:{
                    [Op.and]: [{id: intent.id}, {userId: req.userId}]
                },
            });
        }
        res.status(200).json({ msg: "intent Updated" });
    } catch (error){
        res.status(500).json({ msg: error.message });
    }
}

export const deleteIntent = async (req, res) => {
    try {
        const intent = await Intent.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!intent) return res.status(404).json({ msg: "intent not found" });
        const { intent_name, created_at, updated_at } = req.body;
        if (req.role === "admin"){
          await Intent.destroy({
              where:{
                id:intent.id
            }
          })
        } else {
            if(req.userId !== intent.userId) return res.status(403).json({ msg: "You are not authorized" });
          await Intent.destroy({
                where:{
                    [Op.and]: [{id: intent.id}, {userId: req.userId}]
                },
            });
        }
        res.status(200).json({ msg: "intent Deleted" });
    } catch (error){
        res.status(500).json({ msg: error.message });
    }
}