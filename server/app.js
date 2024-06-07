import express from "express";
import { dbConn } from "./database/db_connection.js";
import { config } from 'dotenv';
import cors from "cors";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import userRoutes from "./route/userRoute.js";
import TaskRoutes from "./route/TaskRoute.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';  // Add this line to import the path module

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config();

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: "https://66635b4997150521601bdc67--tasksbasket.netlify.app/", // Remove the trailing slash
    credentials: true // Allow sending cookies in requests
}));

app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

app.use("/api/user", userRoutes);
app.use("/api/task", TaskRoutes);

dbConn();

export default app;
