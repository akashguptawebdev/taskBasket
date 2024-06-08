import express from "express";
import { dbConn } from "./database/db_connection.js";
import { config } from 'dotenv';
import cors from "cors";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import userRoutes from "./route/userRoute.js";
import TaskRoutes from "./route/TaskRoute.js";

config();

const app = express();
const corsOptions = {
  origin: 'https://tasksbasket.netlify.app',
  credentials: true, // This allows the server to accept credentials (cookies, authorization headers, etc.) from the client.
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://tasksbasket.netlify.app');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use("/api/user", userRoutes);
app.use("/api/task", TaskRoutes);

dbConn();

export default app;
