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
 
//4: app.use() adds a middleware
//middleware tries to handle every request
//this middleware is used for logging
// app.use(( req, res, next ) => {
//   let request = req.method.toUpperCase() +' '+ req.url

//   if( Object.keys( req.query ).length ){
//     request += '?'+ querystring.stringify( req.query )
//   }

//   if( Object.keys( req.body ).length ){
//     request += "\r\n"+ JSON.stringify( req.body )
//   }

//   console.info( `--------------------------------------------------------------\nRequest: ${request}` )

//   //next() tells Express to find the next request handler
//   next()

//   //NOTES:
//   // #1 - you can put some logic here, but it should only handle global tasks like authentication and parsing formats
//   // #2 - you should not put your database logic here
// })


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
