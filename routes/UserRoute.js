import express from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser,register, getTotalUsers } from "../controller/Users.js";
import { verifyUser , superAdminOnly} from "../middleware/AuthUser.js";

const router = express.Router();


router.post("/register", register);
router.get("/users",verifyUser,superAdminOnly, getUsers);
router.get("/users/:id",verifyUser,superAdminOnly, getUserById);
router.post("/users",verifyUser, superAdminOnly,createUser);
router.patch("/users/:id", verifyUser,superAdminOnly, updateUser);
router.delete("/users/:id",verifyUser, superAdminOnly, deleteUser);
router.get("/users/totalku",  getTotalUsers);

export default router;