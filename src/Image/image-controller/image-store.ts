import { Request, Response, NextFunction } from "express";
require("dotenv").config();

const bucketName = process.env.AWS_S3_BUCKET;
const region = "us-east-1";
const accessKey = process.env.AWS_ACCESS_KEY_ID;
const secretKey = process.env.AWS_SECRET_ACCESS_KEY;

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

aws.config.update({
  secretAccessKey: secretKey,
  accessKeyId: accessKey,
  region: region,
});

const s3 = new aws.S3();

export const awsUpload = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: bucketName,
    key: function (req: any, file: any, cb: any) {
      console.log(file);
      cb(null, file.originalname); //use Date.now() for unique file keys
    }, 
  }),
});

export const uploadPhoto = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    res.status(401);
    return next();
  }

  try {
    res.status(200).json({
      status: "succeeded I guess...", 
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      data: {
        user: "unable to store image",
      },
    });
  }
};
 