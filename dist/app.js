"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const user_routes_1 = require("./src/user/user-routes/user-routes");
const express_1 = __importDefault(require("express"));
const path = __importStar(require("path"));
const image_routes_1 = __importDefault(require("./src/Image/image-routes/image-routes"));
const querystring_1 = __importDefault(require("querystring"));
const mainRouter = express_1.default.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
//Here we are configuring express to use our middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/image", image_routes_1.default);
app.use("/", mainRouter);
app.use("/user", user_routes_1.userRouter);
const password = process.env.DATABASE_PASSWORD;
const localDB = process.env.DATABASE_LOCAL;
let db;
if (password != undefined) {
    db = (_a = process.env.DATABASE) === null || _a === void 0 ? void 0 : _a.replace("<PASSWORD>", password);
}
// let mongooseConnect = mongoose.connect("mongodb://localhost:27017");
// console.log(
//   mongooseConnect.then((thread: any) => {
//     // console.log('Mongoose Launch', thread)
//   })
// );
let options = {
    root: path.join(__dirname),
};
//adds a middleware middleware tries to handle every request this middleware is used for logging
app.use((req, res, next) => {
    let request = req.method.toUpperCase() + " " + req.url;
    if (Object.keys(req.query).length) {
        request += "?" + querystring_1.default.stringify(req.query);
    }
    if (Object.keys(req.body).length) {
        request += "\r\n" + JSON.stringify(req.body);
    }
    console.info(`--------------------------------------------------------------\nRequest: ${request}`);
    //next() tells Express to find the next request handler
    next();
    //NOTES:
    // #1 - you can put some logic here, but it should only handle global tasks like authentication and parsing formats
    // #2 - you should not put your database logic here
});
// Pages
mainRouter.get("/", (req, res) => {
    // res.send("<h1>Welcome to Reveal Api</h1>")
    res.sendFile(path.resolve("./public/index.html"));
});
mainRouter.get("/home", (req, res) => {
    console.log(path.resolve('./public/home.html'));
    res.sendFile(path.resolve('./public/home.html'));
});
app.listen(PORT, () => {
    console.log(`Server Running here 👉 https://localhost:${PORT}`);
});
