import { selectUserByName, pushUser } from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import { logger } from "../utils/logger.js";

const JWT_SECRET = process.env.JWT_SECRET;
// console.log("JWT_SECRET", JWT_SECRET);

export const login = async (req, res, next) => {
    try {
        // console.log("req.params", req.body);
        const user = await selectUserByName(req.body.username);
        // console.log("user", user);
        if (user[0].password == req.body.password) {
            const token = jwt.sign({id: user[0].id}, JWT_SECRET, {expiresIn: "4h"});
            // logger.info(`TOKEN HERE: ${token}`);
            // logger.info('TOKEN HERE : ', token);
            // console.log('TOKEN HERE : ', token);
            // const decoded = jwt.decode(token);
            // console.log('DECODED TOKEN : ', decoded);
            res.cookie("token", token, { httpOnly: true, sameSite: "strict"});
            return res.status(200).json({ message: "Login successful", token });
        }
        else {
            // logger.error(error.message);
            logger.error('invalid password');
            return res.status(401).json({ message: "Invalid password" });
        }
    }
    catch (error) {
        next(error);
    }
};

export const logout = async (req, res, next) => {
    res.clearCookie("token");
    console.log("logout !");
    res.status(200).json({ message: "Logged out successfully" });
};
