import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import path from "path";
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
const app: Express = express();
console.log(process.env.FRONTEND_URL);
app.set("trust proxy", 1);
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);
app.use("/", require("./routes/index.routes"));

export default app;
