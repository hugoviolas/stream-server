"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const router = express_1.default.Router();
const file = "/public/video.mov";
const filePath = process.cwd() + file;
const readStream = (0, fs_1.createReadStream)(filePath);
const outputPath = process.cwd() + "/download/movie.mov";
router.get("/", (req, res, next) => {
    res.status(200).send("Response");
});
router.post("/", (req, res, next) => {
    const writeStream = (0, fs_1.createWriteStream)(outputPath);
    writeStream.on("open", () => req.pipe(writeStream));
    writeStream.on("close", () => res.status(200).send("File created"));
});
module.exports = router;
