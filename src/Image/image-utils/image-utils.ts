import { Request, Response, NextFunction } from "express";
import { ImageProps, resizeProps } from "./image-interfaces";
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
export class Image {
  static async rotatePhoto(data: any, angle: number) {
    return await sharp(data).rotate(angle);
  }

  static async resizePhoto(data: any, height: number, width: number) {
    return await sharp(data).resize(height, width);
  }

  static async grayscalePhoto(data: any) {
    return await sharp(data).greyscale();
  }

  static filterInt(value: string) {
    if (/^[-+]?(\d+|Infinity)$/.test(value)) {
      return Number(value);
    } else {
      return NaN;
    }
  }

  static convertBufferToImage(res: any, buffer: any) {
    const base64 = Buffer.from(buffer).toString("base64");
    const mimeType = "image/png";
    res.send(`<img src="data:${mimeType};base64,${base64}"/>`);
    // fs.writeFileSync("../../../public/images/new.png", buffer);
    // res.sendFile('../../../public/images');
  }
}
