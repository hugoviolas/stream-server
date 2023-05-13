import express, {
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from "express";
import fs, {
  createReadStream,
  createWriteStream,
  PathLike,
  ReadStream,
  WriteStream,
} from "fs";
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

const router: Router = express.Router();

const file: string = "/public/video.mov";
const filePath: PathLike = process.cwd() + file;
const readStream: ReadStream = createReadStream(filePath);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send("Response");
});

router.post("/movie", (req: Request, res: Response, next: NextFunction) => {
  const bb = busboy({ headers: req.headers });
  let outputPath: PathLike;

  bb.on("file", (name: any, file: any, info: any) => {
    const headers: string = req.headers["content-length"]!.toString();
    const { filename, encoding, mimeType } = info;
    // const extension: string =
    //   filename.split(".")[filename.split(".").length - 1];
    outputPath = process.cwd() + `/download/${filename}`;

    const writeStream: WriteStream = createWriteStream(outputPath);

    writeStream.on("close", () => {
      console.log(`Processing  ...  100 % done`);
      res.status(200).send("File created");
    });

    writeStream.on("drain", () => {
      const written: number = writeStream.bytesWritten;
      const total: number = parseInt(headers);
      const pWritten: string = ((written / total) * 100).toFixed(2);
      console.log(`Processing  ...  ${pWritten}% done`);
    });

    file.pipe(writeStream);
  });
  req.pipe(bb);
});

module.exports = router;
