import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = async(req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('req', req.cookies);
    console.log('req.headers', req.headers);
    if(!token) {
        return res.status(401).json({ message: "You are not logged in" });
    }

    try {
        // console.log('JWT_SECRET', JWT_SECRET);
        // console.log('token', token);
        jwt.verify(token, JWT_SECRET);
        return next();
    } catch(error) {
        console.error("Invalid Token", error);
        res.clearCookie("token");
        return null;
    }
}