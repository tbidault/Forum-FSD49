import { selectThreads, selectThreadById, selectThreadsBySectionId, selectThreadByTitle, pushThread, deleteThread, updateThread } from '../models/threadModel.js';

export const getThreads = async (req, res, next) => {
    try {
        const result = await selectThreads();
        res.status(201).json(result);
    }   catch (error) {
        next(error);
      }
};

export const getThreadById = async (req, res, next) => {
    try {
        const result = await selectThreadById(req.params.id);
        res.status(201).json(result);
    }   catch (error) {
        next(error);
      }
};

export const getThreadByTitle = async (req, res, next) => {
    try {
        console.log("req.body.title", req.body.title);
        const result = await selectThreadByTitle(req.body.title);
        res.status(201).json(result);
    }   catch (error) {
        next(error);
    }
};
export const getThreadsBySectionId = async (req, res, next) => {
    try {
        const result = await selectThreadsBySectionId(req.params.id);
        res.status(201).json(result);
    }   catch (error) {
        next(error);
    }
};
    
export const addThread = async (req, res, next) => {
    try {
        const thread = {
            ...req.body,
        };
        const result = await pushThread(thread);
        res.status(201).json(result);
    }   catch (error) {
        next(error);
      }
};

export const deleteThreadById = async (req, res, next) => {
    try {
        const result = await deleteThread(req.params.id);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
      }
};

export const updateThreadById = async (req, res, next) => {
    try {
        const result = await updateThread(req.params.id, req.body);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
      }
};

