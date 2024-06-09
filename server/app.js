import express from "express";
import { dbConn } from "./database/db_connection.js";
import { config } from 'dotenv';
import cors from "cors";
import  path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import userRoutes from "./route/userRoute.js";
import TaskRoutes from "./route/TaskRoute.js";

config({
    path:"./config/.env"
});

const app = express();
const corsOptions = {
  origin: 'https://task-basket.vercel.app',
  credentials: true, // This allows the server to accept credentials (cookies, authorization headers, etc.) from the client.
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Specify allowed methods
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://task-basket.vercel.app');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use("/api/user", userRoutes);
app.use("/api/task", TaskRoutes);

dbConn();

export default app;
