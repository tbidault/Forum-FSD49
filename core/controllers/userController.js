import pkg from 'cloudinary';
import { selectUsers, selectUserById, selectUserByName, pushUser, deleteUser, updateUser } from '../models/userModel.js';
import { upload } from '../upload.js';
import argon2 from 'argon2';

const { v2 : cloudinary } = pkg;

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
        // console.log("user", user);
        // console.log("user.password", user.password);
        user.password = await argon2.hash(user.password);
        // console.log("user", user);
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
        // console.log("Data:", req.body);
        const updatedData = { ...req.body };
        if (updatedData.password) {
            updatedData.password = await argon2.hash(updatedData.password);
        }
        if (req.file) {
            const currentUser = await selectUserById(req.params.id);
            if (currentUser[0].avatar_url) {
                // console.log('currentUser[0].avatar_url', currentUser[0].avatar_url);
                // const publicId = currentUser[0].avatar_url.split('/').pop().split('.')[0];
                const publicId = currentUser[0].avatar_url.split('/image/upload/')[1].replace(/^v\d+\//, '').split('.')[0];
                await cloudinary.uploader.destroy(publicId, {invalidate: true});
            }
            updatedData.avatar_url = req.file.path;
            // console.log('before upload', 'req.file', req.file, 'req.file.filename', req.file.path);
            // const imgUpload = await cloudinary.uploader.upload(req.file.path)
            // updatedData.avatar_url = imgUpload.secure_url;
            // updatedData.avatar_url = `/uploads/${req.file.filename}`;
          }
        const result = await updateUser(req.params.id, updatedData);
        res.status(201).json(result);
    }
    catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        next(error);
      }
    });
};

