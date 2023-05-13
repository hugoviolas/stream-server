import express, { Express, Request, Response, NextFunction } from "express";
import fs, { createReadStream, createWriteStream } from "fs";
import path from "path";
const router = express.Router();

const file = "/public/video.mov";
const filePath = process.cwd() + file;
const readStream = createReadStream(filePath);
const outputPath = process.cwd() + "/download/movie.mov";

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send("Response");
});

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  const writeStream = createWriteStream(outputPath);
  writeStream.on("open", () => req.pipe(writeStream));
  writeStream.on("close", () => res.status(200).send("File created"));
});

module.exports = router;
