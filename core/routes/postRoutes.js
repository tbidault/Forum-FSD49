import { Router } from "express";
import { getPosts, getPostById, getPostByAuthor, getPostByThread, getLatestPostByThread, addPost, deletePost, updatePost } from '../controllers/postController.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.get("/author/:author_id", getPostByAuthor);
router.get("/thread/:thread_id", getPostByThread);
router.get("/thread/last/:thread_id", getLatestPostByThread);
router.post("/", authMiddleware, addPost);
router.delete("/:id", authMiddleware, deletePost);
router.put("/:id", authMiddleware, updatePost);

export default router;