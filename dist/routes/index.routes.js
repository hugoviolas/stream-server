"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const busboy = require("busboy");
// const multer = require("multer");
// const storage = multer.diskStorage({
//   destination: function (_req: Request, _file: any, cb: CallableFunction) {
//     cb(null, "download/");
//   },
//   filename: function (_req: Request, file: any, cb: CallableFunction) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage: storage });
const router = express_1.default.Router();
const file = "/public/video.mov";
const filePath = process.cwd() + file;
const readStream = (0, fs_1.createReadStream)(filePath);
router.get("/", (req, res, next) => {
    res.status(200).send("Response");
});
router.post("/movie", (req, res, next) => {
    const bb = busboy({ headers: req.headers });
    let outputPath;
    bb.on("file", (name, file, info) => {
        const headers = req.headers["content-length"].toString();
        const { filename, encoding, mimeType } = info;
        // const extension: string =
        //   filename.split(".")[filename.split(".").length - 1];
        outputPath = process.cwd() + `/download/${filename}`;
        const writeStream = (0, fs_1.createWriteStream)(outputPath);
        writeStream.on("close", () => {
            console.log(`Processing  ...  100 % done`);
            res.status(200).send("File created");
        });
        writeStream.on("drain", () => {
            const written = writeStream.bytesWritten;
            const total = parseInt(headers);
            const pWritten = ((written / total) * 100).toFixed(2);
            console.log(`Processing  ...  ${pWritten}% done`);
        });
        file.pipe(writeStream);
    });
    req.pipe(bb);
});
module.exports = router;
