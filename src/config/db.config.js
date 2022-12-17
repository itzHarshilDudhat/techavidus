import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.set("strictQuery", false);
export const DB = () => {
  mongoose
    .connect(process.env.DATABASE)
    .then(() => {
      console.log(`Database connected`);
    })
    .catch((error) => {
      console.log(error);
    });
};
