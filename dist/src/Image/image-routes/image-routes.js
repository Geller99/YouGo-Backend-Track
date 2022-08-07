"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_list_1 = require("./../image-controller/image-list");
const express_1 = __importDefault(require("express"));
const image_store_1 = require("../image-controller/image-store");
const image_resize_1 = require("../image-controller/image-resize");
const image_download_1 = require("../image-controller/image-download");
const image_manipulate_src_1 = require("../image-controller/image-manipulate-src");
const image_config_1 = require("../image-utils/image-config");
const image_grayscale_1 = require("../image-controller/image-grayscale");
const image_rotate_1 = require("../image-controller/image-rotate");
const imageRouter = express_1.default.Router();
/**
 * @dev created endpoints for image manipulation
 */
imageRouter.post("/resize", image_config_1.upload.single("photo"), image_resize_1.resizePhoto);
imageRouter.post("/grayscale", image_config_1.upload.single("photo"), image_grayscale_1.grayscalePhoto);
imageRouter.post("/rotate", image_config_1.upload.single("photo"), image_rotate_1.rotatePhoto);
imageRouter.post("/store", image_store_1.awsUpload.single("photo"), image_store_1.uploadPhoto);
imageRouter.get("/fetchList", image_list_1.getListOfPhotosFromS3);
imageRouter.post("/fetchImage", image_download_1.getImageByName);
imageRouter.post("/manipulateStore", image_manipulate_src_1.manipulateImageFromS3);
exports.default = imageRouter;
