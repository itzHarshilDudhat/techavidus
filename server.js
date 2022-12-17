import express from "express";
import dotenv from "dotenv";
import allRoute from "./src/routes/Route.js";
import { DB } from "./src/config/db.config.js";
dotenv.config();
DB();
const app = express();
app.use("/images", express.static("./public/uploads"));

app.use(express.json());

app.use("/", allRoute);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on\nhttp://localhost:${PORT}/`);
});
