import express from "express";
import { dbConn } from "./database/db_connection.js";
import {config} from 'dotenv';
import cors from "cors";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import userRoutes from "./route/userRoute.js";
import TaskRoutes from "./route/TaskRoute.js";

config()



let app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors())
app.use("/api/user",userRoutes)
app.use("/api/task",TaskRoutes)



dbConn();

export default app;