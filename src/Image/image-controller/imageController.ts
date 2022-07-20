import { Request, Response } from "express";
const path = require("path");
const multer = require("multer");
const sharp = require("sharp");

/**
 * @dev stores image in memory as buffer then loads buffer into Sharp for image resizing
 */
const multerStorage = multer.memoryStorage();

const filterInt = (value: string) => {
  if (/^[-+]?(\d+|Infinity)$/.test(value)) {
    return Number(value);
  } else {
    return NaN;
  }
};

export const resizePhoto = async (req: any, res: any, next: any) => {
  if (!req.file) {
    res.status(401);
    return next();
  }

  const extension: string = req.file.mimetype.split("/")[1];
  const height: number = filterInt(req.body.height);
  const width: number = filterInt(req.body.width);

  const filePath = path.join(
    __dirname,
    "..",
    `public/resize/resize${Date.now()}.${extension}`
  );

  // how best to implement error handling and status codes ?
  await sharp(req.file.buffer)
    .resize(height, width)
    .jpeg({ quality: 90 })
    .toFile(filePath)
    .then((data: any) => {
      res.status(201).sendFile(filePath);
    });
};

export const grayscalePhoto = async (req: any, res: any, next: any) => {
  if (!req.file) return next();

  const extension: string = req.file.mimetype.split("/")[1];
  const filePath = path.join(
    __dirname,
    "..",
    `public/grayscale/gray${Date.now()}.${extension}`
  );

  await sharp(req.file.buffer)
    .greyscale()
    .jpeg({ quality: 90 })
    .toFile(filePath)
    .then((data: any) => {
      res.status(201).sendFile(filePath);
    });
};

export const rotatePhoto = async (req: any, res: any, next: any) => {
  if (!req.file) return next();

  const angle: number = filterInt(req.body.angle);
  const extension: string = req.file.mimetype.split("/")[1];
  const filePath = path.join(
    __dirname,
    "..",
    `../../public/rotate/rotated${Date.now()}.${extension}`
  );


  await sharp(req.file.buffer)
    .rotate(angle)
    .jpeg({ quality: 90 })
    .toFile(filePath)
    .then((data: any) => {
      res.status(201).sendFile(filePath);
    });

};

const multerFilter = (req: Request, file: any, cb: any) => {
  if (file.mimetype.startWith == "image") cb(null, true);
  cb(new Error("Wrong file type"), false);
};

export const upload = multer({
  storage: multerStorage,
  filter: multerFilter,
});
