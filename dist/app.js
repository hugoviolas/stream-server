"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv_1.default.config();
const app = (0, express_1.default)();
console.log(process.env.FRONTEND_URL);
app.set("trust proxy", 1);
app.use(express_1.default.static(path_1.default.join(__dirname, "./public")));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    origin: "*",
    credentials: false,
}));
app.use("/", require("./routes/index.routes"));
exports.default = app;
