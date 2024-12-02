import { Router } from "express";
import { getThreads, getThreadByTitle, getThreadById, getThreadsBySectionId, addThread, deleteThreadById, updateThreadById } from "../controllers/threadController.js";
import { authMiddleware } from '../middlewares/auth.js';

const router = Router();

// router.get("/", getThreads);
router.get("/", getThreads);
router.get("/name", getThreadByTitle);
router.get("/:id", getThreadById);
router.get("/section/:id", getThreadsBySectionId);
router.post("/", authMiddleware, addThread);
router.delete("/:id", authMiddleware, deleteThreadById);
router.put("/:id", authMiddleware, updateThreadById);

export default router;