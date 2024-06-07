import express from "express";
import { getUserDetails, login, logout, userRegistration } from "../controller/userController.js";
import { isUser } from "../middleware/auth.js";
const route = express.Router();

route.post("/registration",userRegistration)
route.post("/login", login);
route.get("/details" ,isUser , getUserDetails);
route.get("/logout" , isUser , logout)



export default route;