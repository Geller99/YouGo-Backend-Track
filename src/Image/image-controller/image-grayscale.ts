import { ImageProps } from "../image-utils/image-interfaces";
import { Request, Response, NextFunction } from "express";
import { Image } from "../image-utils/image-utils";
const path = require("path");
const sharp = require("sharp");

/**
 * @dev stores image in memory as buffer then loads buffer into Sharp for image resizing
 */

export const grayscalePhoto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) return next();

  const extension: string = req.file.mimetype.split("/")[1];
  const filePath = path.join(
    __dirname,
    "../../..",
    `public/grayscale/gray${Date.now()}.${extension}`
  );

  Image.grayscalePhoto(req.file.buffer).then(async (data: any) => {
    return await data
      .jpeg({ quality: 90 })
      .toFile(filePath)
      .then((data: any) => {
        res.status(201).sendFile(filePath);
      });
  });
};
