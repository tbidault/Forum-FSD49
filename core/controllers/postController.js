import { 
    selectPosts,
    selectPostById,
    selectPostByAuthorId,
    selectPostByThreadId,
    selectLatestPostByThreadId,
    pushPost,
    deletePostById,
    updatePostById,
} from '../models/postModel.js';

export const getPosts = async (req, res, next) => {
    try {
        const result = await selectPosts();
        res.status(201).json(result);
    }   catch (error) {
        next(error);
      }
};

export const getPostById = async (req, res, next) => {
    try {
        const result = await selectPostById(req.params.id);
        res.status(201).json(result);
    }   catch (error) {
        next(error);
      }
};

export const getPostByAuthor = async (req, res, next) => {
    try {
        const result = await selectPostByAuthorId(req.params.author_id);
        res.status(201).json(result);
    }   catch (error) {
        next(error);
      }
};

export const getPostByThread = async (req, res, next) => {
    try {
        const result = await selectPostByThreadId(req.params.thread_id);
        res.status(201).json(result);
    }   catch (error) {
        next(error);
      }
};

export const getLatestPostByThread = async (req, res, next) => {
    try {
        const result = await selectLatestPostByThreadId(req.params.thread_id);
        res.status(201).json(result);
    }   catch (error) {
        next(error);
      }
};

export const addPost = async (req, res, next) => {
    try {
        const Post = {
            ...req.body,
        };
        const result = await pushPost(Post);
        res.status(201).json(result);
    }   catch (error) {
        next(error);
      }
};

export const deletePost = async (req, res, next) => {
    try {
        const result = await deletePostById(req.params.id);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
      }
};

export const updatePost = async (req, res, next) => {
    try {
        const result = await updatePostById(req.params.id, req.body);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
      }
};