import { getListOfPhotosFromS3 } from './../image-controller/image-list';
import express from "express";
import { awsUpload, uploadPhoto } from "../image-controller/image-store";
import {
  resizePhoto,
} from "../image-controller/image-resize";
import { getImageByName } from '../image-controller/image-download';
import { manipulateImageFromS3 } from '../image-controller/image-manipulate-src';
import { upload } from '../image-utils/image-config';
import { grayscalePhoto } from '../image-controller/image-grayscale';
import { rotatePhoto } from '../image-controller/image-rotate';

const imageRouter = express.Router();

/**
 * @dev created endpoints for image manipulation
 */

imageRouter.post("/resize", upload.single("photo"), resizePhoto);
imageRouter.post("/grayscale", upload.single("photo"), grayscalePhoto);
imageRouter.post("/rotate", upload.single("photo"), rotatePhoto);
imageRouter.post("/store", awsUpload.single("photo"), uploadPhoto);
imageRouter.get("/fetchList", getListOfPhotosFromS3);
imageRouter.post("/fetchImage", getImageByName);
imageRouter.post("/manipulateStore", manipulateImageFromS3);

export default imageRouter;
