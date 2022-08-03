import { Request, Response, NextFunction } from "express";
const sharp = require("sharp");

/**
 * @dev Utils contain methods and classes for creating reusable static methods
 * 
 * @dev Utils will contain reference points for aws and sharp internal functions
 * 
 */

export interface ImageProps {
  req: Request | any;
  res: Response;
  next?: NextFunction;
  angle?: number;
  quality: number;
  filePath: string;
}

interface resize extends ImageProps {
  height: number;
  width: number;
}


/**
 * @dev needs to expand function to handle buffer vs handling actual image file paths
 * 
 * 
 */
export class Image {
  static async rotatePhoto({ req, res, angle, quality, filePath }: ImageProps) {
    return await sharp(req.file.buffer)
      .rotate(angle)
      .jpeg({ quality: quality })
      .toFile(filePath)
      .then((data: any) => {
        res.status(201).sendFile(filePath);
      });
  }

  static async resizePhoto({
    req,
    res,
    filePath,
    quality,
    height,
    width,
  }: resize) {
    return await sharp(req.file.buffer)
      .resize(height, width)
      .jpeg({ quality: quality })
      .toFile(filePath)
      .then((data: any) => {
        res.status(201).sendFile(filePath);
      });
  }

  static async grayscalePhoto({ req, res, filePath, quality }: ImageProps) {
    return await sharp(req.file.buffer)
      .greyscale()
      .jpeg({ quality: quality })
      .toFile(filePath)
      .then((data: any) => {
        res.status(201).sendFile(filePath);
      });
  }
}
