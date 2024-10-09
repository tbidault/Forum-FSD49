import { selectUsers, selectUserById, selectUserByName, pushUser, deleteUser, updateUser } from '../models/userModel.js';

export const getUsers = async (req, res, next) => {
    try {
        const result = await selectUsers();
        res.status(201).json(result);
    }   catch (error) {
        next(error);
      }
};

export const getUserById = async (req, res, next) => {
    try {
        const result = await selectUserById(req.params.id);
        res.status(201).json(result);
    }   catch (error) {
        next(error);
      }
};

export const getUserByName = async (req, res, next) => {
    try {
        console.log("req.body.username", req.body.username);
        const result = await selectUserByName(req.body.username);
        res.status(201).json(result);
    }   catch (error) {
        next(error);
    }
};

export const addUser = async (req, res, next) => {
    try {
        const user = {
            ...req.body,
        };
        const result = await pushUser(user);
        res.status(201).json(result);
    }   catch (error) {
        next(error);
      }
};

export const deleteUserById = async (req, res, next) => {
    try {
        const result = await deleteUser(req.params.id);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
      }
};

export const updateUserById = async (req, res, next) => {
    try {
        const result = await updateUser(req.params.id, req.body);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
      }
};

