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
exports.Image = void 0;
const sharp = require("sharp");
const fs = require("fs");
/**
 * @dev Utils contain methods and classes for creating reusable static methods
 *
 * @dev Utils will contain reference points for aws and sharp internal functions
 *
 */
/**
 * @dev needs to expand function to handle buffer vs handling actual image file paths
 *
 *
 */
class Image {
    static rotatePhoto(data, angle) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield sharp(data).rotate(angle);
        });
    }
    static resizePhoto(data, height, width) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield sharp(data).resize(height, width);
        });
    }
    static grayscalePhoto(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield sharp(data).greyscale();
        });
    }
    static filterInt(value) {
        if (/^[-+]?(\d+|Infinity)$/.test(value)) {
            return Number(value);
        }
        else {
            return NaN;
        }
    }
    static convertBufferToImage(res, buffer) {
        const base64 = Buffer.from(buffer).toString("base64");
        const mimeType = "image/png";
        res.send(`<img src="data:${mimeType};base64,${base64}"/>`);
        // fs.writeFileSync("../../../public/images/new.png", buffer);
        // res.sendFile('../../../public/images');
    }
}
exports.Image = Image;
