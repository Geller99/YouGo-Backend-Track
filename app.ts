import { userRouter } from "./src/user/user-routes/user-routes";
import express, { Request, Response, Application } from "express";
import * as fs from "fs";
import * as path from "path";
import imageRouter from "./src/Image/image-routes/image-routes";
import querystring from "querystring";
const mainRouter = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app: Application = express();
const PORT = process.env.PORT || 8000;

//Here we are configuring express to use our middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/image", imageRouter);
app.use("/", mainRouter);
app.use("/user", userRouter);


const password = process.env.DATABASE_PASSWORD;
const localDB = process.env.DATABASE_LOCAL;
let db;

if (password != undefined) {
  db = process.env.DATABASE?.replace("<PASSWORD>", password);
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
app.use((req: any, res: any, next: any) => {
  let request = req.method.toUpperCase() + " " + req.url;

  if (Object.keys(req.query).length) {
    request += "?" + querystring.stringify(req.query);
  }

  if (Object.keys(req.body).length) {
    request += "\r\n" + JSON.stringify(req.body);
  }

  console.info(
    `--------------------------------------------------------------\nRequest: ${request}`
  );

  //next() tells Express to find the next request handler
  next();

  //NOTES:
  // #1 - you can put some logic here, but it should only handle global tasks like authentication and parsing formats
  // #2 - you should not put your database logic here
});

// Pages
mainRouter.get("/", (req: Request, res: Response): void => {
  res.send("<h1>Welcome to Reveal Api</h1>")
  // res.sendFile("./public/index.html", options);
});

mainRouter.get("/home", (req: Request, res: Response): void => {
  console.log(path.resolve('./public/home.html'));
  res.sendFile(path.resolve('./public/home.html'));
});

app.listen(PORT, (): void => {
  console.log(`Server Running here 👉 https://localhost:${PORT}`);
});
