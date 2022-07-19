import express from "express";
import { grayscalePhoto, resizePhoto, rotatePhoto, upload } from "../image-controller/imageController";

const imageRouter = express.Router();


/**
 * @dev created endpoints for image manipulation
 */

imageRouter.post("/resize", upload.single("photo"), resizePhoto);
imageRouter.post("/grayscale", upload.single("photo"), grayscalePhoto);
imageRouter.post("/rotate", upload.single("photo"), rotatePhoto);

export default imageRouter;