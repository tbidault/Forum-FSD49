import { Router } from "express";
import { getPosts, getPostById, getPostByAuthor, getPostByThread, getLatestPostByThread, addPost, deletePost, updatePost } from '../controllers/postController.js';

const router = Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.get("/author/:author_id", getPostByAuthor);
router.get("/thread/:thread_id", getPostByThread);
router.get("/thread/last/:thread_id", getLatestPostByThread);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

export default router;