import express from "express";
import { deleteTask, getAllTask, newTaskController, updateTask } from "../controller/TaskController.js";
import { isUser } from "../middleware/auth.js";


const route = express.Router();

route.post("/newTask", isUser ,newTaskController)
route.get("/getAllTask", isUser ,getAllTask);
route.delete("/taskDelete/:id" ,isUser, deleteTask);
route.patch("/taskUpdate/:id" , isUser, updateTask);




export default route;