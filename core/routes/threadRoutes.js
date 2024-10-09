import { Router } from "express";
import { getThreads, getThreadByTitle, getThreadById, getThreadsBySectionId, addThread, deleteThreadById, updateThreadById } from "../controllers/threadController.js";

const router = Router();

// router.get("/", getThreads);
router.get("/", getThreads);
router.get("/name", getThreadByTitle);
router.get("/:id", getThreadById);
router.get("/section/:id", getThreadsBySectionId);
router.post("/", addThread);
router.delete("/:id", deleteThreadById);
router.put("/:id", updateThreadById);

export default router;