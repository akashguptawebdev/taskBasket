import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();


console.log(process.env.MONGO_URI)
export const dbConn = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
        console.log(
          `Some error occured while connecting to dataBase : Err: - ${err}`
        )
    });
};
