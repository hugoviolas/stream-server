import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

// app.get("/", (req: Request, res: Response, next: NextFunction) => {
//   res.status(200).send(`Server online, connected to http://localhost:${port}`);
// });
app.use("/", require("./routes/index.routes"));

export default app;
