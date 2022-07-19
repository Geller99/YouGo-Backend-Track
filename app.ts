import express, { Request, Response, Application } from "express";
import * as fs from "fs";
import * as path from "path";
import imageRouter from "./src/Image/image-routes/image-routes";
const mainRouter = express.Router();
const bodyParser = require("body-parser");
const app: Application = express();
const PORT = process.env.PORT || 8000;

//Here we are configuring express to use our middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/image", imageRouter);
app.use("/", mainRouter);

let options = {
  root: path.join(__dirname),
};
 



// Pages
mainRouter.get("/", (req: Request, res: Response): void => {
  res.sendFile("./public/index.html", options);
});

mainRouter.get("/home", (req: Request, res: Response): void => {
  res.sendFile("./public/home.html", options);
});


app.listen(PORT, (): void => {
  console.log(`Server Running here 👉 https://localhost:${PORT}`);
});
