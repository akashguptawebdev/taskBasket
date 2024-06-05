import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const MONGO_URI = "mongodb+srv://akashkashyapy:8BrfkEVC3XDyxdMi@taskbasket.solc44e.mongodb.net/?retryWrites=true&w=majority&appName=taskbasket"


export const dbConn = () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
        console.log(
          `Some error occured while connecting to dataBase : Err: - ${err}`
        )
    });
};
