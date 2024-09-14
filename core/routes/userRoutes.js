import { Router } from "express";
import { getUsers, getUserById, getUserByName, addUser, deleteUserById, updateUserById } from "../controllers/userController.js";

const router = Router();

// router.get("/", getUsers);
router.get("/", getUsers);
router.get("/name", getUserByName);
router.get("/:id", getUserById);
router.post("/", addUser);
router.delete("/:id", deleteUserById);
router.put("/:id", updateUserById);

export default router;