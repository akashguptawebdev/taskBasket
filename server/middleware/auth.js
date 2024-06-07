import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";

export const isUser = async (req, res, next) => {
    try {
        // Check both cookies and headers for the token
        let token = req.cookies.loginToken || req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        // Extract the token from the authorization header if present
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

        const JWT_SECRET_KEY = "kljsakhkjhcasl";

        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
       
        // Check if the user exists
        req.user = await userModel.findById(decoded.id);
    
        if (!req.user) {
            return res.status(403).json({ message: "Not authorized for this resource" });
        }

        next();
    } catch (error) {
        console.error("auth", error.message);
        return res.status(200).json({ message: "Invalid token or user not authenticated" });
    }
};
