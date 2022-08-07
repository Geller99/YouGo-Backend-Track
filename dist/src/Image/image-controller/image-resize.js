"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizePhoto = void 0;
const image_utils_1 = require("../image-utils/image-utils");
const path = require("path");
const sharp = require("sharp");
/**
 * @dev stores image in memory as buffer then loads buffer into Sharp for image resizing
 */
const resizePhoto = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        res.status(401);
        return next();
    }
    const extension = req.file.mimetype.split("/")[1];
    const height = image_utils_1.Image.filterInt(req.body.height);
    const width = image_utils_1.Image.filterInt(req.body.width);
    const filePath = path.join(__dirname, "../../..", `public/resize/resize${Date.now()}.${extension}`);
    image_utils_1.Image.resizePhoto(req.file.buffer, height, width).then((data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield data
            .jpeg({ quality: 90 })
            .toFile(filePath)
            .then((data) => {
            res.status(201).sendFile(filePath);
        });
    }));
});
exports.resizePhoto = resizePhoto;
