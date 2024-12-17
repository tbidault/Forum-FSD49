import { Router } from "express";
import { getUsers, getUsersForAdmin, getUserById, getUserByName, addUser, deleteUserById, updateUserById } from "../controllers/userController.js";
import { authMiddleware } from '../middlewares/auth.js';

const router = Router();

// router.get("/", getUsers);
router.get("/", getUsers);
router.get("/forAdmin", getUsersForAdmin);
router.get("/name", getUserByName);
router.get("/:id", getUserById);
router.post("/", addUser);
router.delete("/:id", authMiddleware, deleteUserById);
router.put("/:id", authMiddleware, updateUserById);

export default router;