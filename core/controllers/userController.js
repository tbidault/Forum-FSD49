import { selectUsers, selectUserById, selectUserByName, pushUser, deleteUser, updateUser } from '../models/userModel.js';
import { upload } from '../upload.js';

export const getUsers = async (req, res, next) => {
    try {
        const result = await selectUsers();
        res.status(201).json(result);
    }   catch (error) {
        next(error);
      }
};

export const getUsersForAdmin = async (req, res, next) => {
    try {
        const users = await selectUsers();
        const result = users.map(user => ({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            created_at: user.created_at,
          }));
        res.status(201).json(result);
    }   catch (error) {
        next(error);
      }
};

export const getUserById = async (req, res, next) => {
    try {
        const result = await selectUserById(req.params.id);
        // console.log('user ', result);
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
    upload.single('avatar')(req, res, async (err) => {
        if (err) {
            return next(err);
        }
    try {
        console.log("Data:", req.body);
        const updatedData = { ...req.body };
        if (req.file) {
            updatedData.avatar_url = `/uploads/${req.file.filename}`;
          }
        console.log("Updated Data:", updatedData);
        const result = await updateUser(req.params.id, updatedData);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
      }
    });
};

