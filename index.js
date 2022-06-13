import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routers/index.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(router)
dotenv.config();

const PORT = 4000 || process.env.PORT
app.listen(PORT, () => console.log("The server is running on port " + PORT));