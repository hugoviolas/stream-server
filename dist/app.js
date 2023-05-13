"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// app.get("/", (req: Request, res: Response, next: NextFunction) => {
//   res.status(200).send(`Server online, connected to http://localhost:${port}`);
// });
app.use("/", require("./routes/index.routes"));
exports.default = app;
