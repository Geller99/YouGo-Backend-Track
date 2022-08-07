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
exports.rotatePhoto = void 0;
const image_utils_1 = require("../image-utils/image-utils");
const path = require("path");
const sharp = require("sharp");
/**
 * @dev stores image in memory as buffer then loads buffer into Sharp for image resizing
 */
const rotatePhoto = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file)
        return next();
    const angle = image_utils_1.Image.filterInt(req.body.angle);
    const extension = req.file.mimetype.split("/")[1];
    const filePath = path.join(__dirname, "../../..", `public/rotate/rotated${Date.now()}.${extension}`);
    image_utils_1.Image.rotatePhoto(req.file.buffer, angle).then((data) => __awaiter(void 0, void 0, void 0, function* () {
        yield data
            .jpeg({ quality: 90 })
            .toFile(filePath)
            .then((data) => {
            res.status(201).sendFile(filePath);
        });
    }));
});
exports.rotatePhoto = rotatePhoto;