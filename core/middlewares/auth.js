import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = async(req, res, next) => {
    const token = req.cookies?.token;
    console.log('req', req.cookies);

    if(!token) {
        return res.status(401).json({ message: "You are not logged in" });
    }

    try {
        console.log('JWT_SECRET', JWT_SECRET);
        console.log('token', token);
        jwt.verify(token, JWT_SECRET);
        return next();
    } catch(error) {
        console.error("Invalid Token", error);
        res.clearCookie("token");
        return null;
    }
}