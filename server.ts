import express, { Request, Response, Application } from "express";
import * as fs from "fs";
import * as path from "path";
import { grayscalePhoto, resizePhoto, rotatePhoto, upload } from "./Image/imageController";
const imagesRouter = express.Router();
const mainRouter = express.Router();
const bodyParser = require("body-parser");
const app: Application = express();
const PORT = process.env.PORT || 8000;

//Here we are configuring express to use our middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/image", imagesRouter);
app.use("/", mainRouter);

let options = {
  root: path.join(__dirname),
};

/**
 * @dev uses POST method for file upload
 */
imagesRouter.post("/resize", upload.single("photo"), resizePhoto);
imagesRouter.post("/grayscale", upload.single("photo"), grayscalePhoto);
imagesRouter.post("/rotate", upload.single("photo"), rotatePhoto);




// Pages
mainRouter.get("/", (req: Request, res: Response): void => {
  res.sendFile("./public/index.html", options);
});

mainRouter.get("/home", (req: Request, res: Response): void => {
  res.sendFile("./public/home.html", options);
});


/**
 * @dev was practicing using streams, pipes and other filesystem functions
 */
mainRouter.get("/readFile", (req: Request, res: Response) => {
  // this solution doesn't work effectively for huge files
  //   fs.readFile("simule.txt", (err, data) => {
  //     if (err) console.log("Invalid File");
  //     res.end(data);
  //   });

  // Efficient Solution = create a readable streams
  const readable = fs.createReadStream("second.txt");

  readable.on("data", (chunk) => {
    // response object is a stream, so we stream the file to the client
    res.status(200);
    res.write(chunk);
  });

  // end method signals that no more data will be written to this writable stream
  readable.on("end", () => {
    res.status(200);
    res.end();
  });

  // error event handling with streams
  readable.on("error", (err) => {
    res.status(500);
    res.end("File not found");

    // Solution Three: Solving Back Pressure
    // Pipe the output of a readable stream into the input of a writable stream, fixing the back pressure by handling the speed of data flow in and out
    const newReadable = fs.createReadStream("simule.txt");
    // source - newReadable - piped to the destination (res).
    newReadable.pipe(res);
  });
});

//////////////////L///I///S///T///E///N////////////////////////////////

app.listen(PORT, (): void => {
  console.log(`Server Running here 👉 https://localhost:${PORT}`);
});
