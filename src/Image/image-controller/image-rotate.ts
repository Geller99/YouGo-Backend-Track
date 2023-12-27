import { ImageProps } from "./../image-utils/image-interfaces";
import { Request, Response, NextFunction } from "express";
import { Image } from "../image-utils/image-utils";
const path = require("path");
const sharp = require("sharp");

/**
 * @dev stores image in memory as buffer then loads buffer into Sharp for image resizing
 */

export const rotatePhoto = async (req: any, res: any, next: any) => {
  if (!req.file) return next();

  const angle: number = Image.filterInt(req.body.angle);
  if (isNaN(angle)) {
    return res.status(400).send("Invalid angle provided");
  }
  
  const extension: string = req.file.mimetype.split("/")[1];
  const filePath = path.join(
    __dirname,
    "../../..",
    `public/rotate/rotated${Date.now()}.${extension}`
  );

  Image.rotatePhoto(req.file.buffer, angle).then(async (data: any) => {
    await data
      .jpeg({ quality: 90 })
      .toFile(filePath)
      .then((data: any) => {
        res.status(201).sendFile(filePath);
      });
  });
};
