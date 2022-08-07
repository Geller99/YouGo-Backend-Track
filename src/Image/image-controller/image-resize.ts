import { ImageProps } from "../image-utils/image-interfaces";
import { Request, Response, NextFunction } from "express";
import { Image } from "../image-utils/image-utils";
const path = require("path");
const sharp = require("sharp");

/**
 * @dev stores image in memory as buffer then loads buffer into Sharp for image resizing
 */

export const resizePhoto = async (req: any, res: any, next: any) => {
  if (!req.file) {
    res.status(401);
    return next();
  }

  const extension: string = req.file.mimetype.split("/")[1];
  const height: number = Image.filterInt(req.body.height);
  const width: number = Image.filterInt(req.body.width);

  const filePath = path.join(
    __dirname,
    "../../..",
    `public/resize/resize${Date.now()}.${extension}`
  );

  Image.resizePhoto(req.file.buffer, height, width).then(async (data: any) => {
    return await data
      .jpeg({ quality: 90 })
      .toFile(filePath)
      .then((data: any) => {
        res.status(201).sendFile(filePath);
      });
  });
};
