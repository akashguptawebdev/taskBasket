import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";

export const isUser = async (req, res, next) => {
    try {
        const token = req.cookies.loginToken; // Assuming the token is stored in the 'loginToken' cookie
        if (!token) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        // const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "kljsakhkjhcasl";
        
        // Authorization
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
       
        req.user = await userModel.findById(decoded.id);
    
        if (!req.user) {
            return res.status(403).json({ message: "Not authorized for this resource" });
        }

        next();
    } catch (error) {
        console.error("auth", error.message);
        return res.status(401).json({ message: "Invalid token or user not authenticated" });
    }
};
