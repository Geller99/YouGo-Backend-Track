import { Request, Response, NextFunction } from "express";
const aws = require("aws-sdk");
aws.config.update({ region: "us-east-1" });

const bucketParams = {
  Bucket: "revealapibucket",
};

const s3 = new aws.S3();

// Call S3 to obtain a list of the objects in the bucket

export const getListOfPhotosFromS3 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  console.log( req.body);
  try {
    await s3.listObjects(bucketParams, (err: any, data: any) => {
      res.status(200).json({
        status: "succeeded I guess...",
        data: data.Contents,
      });
    });
 
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      data: {
        user: "unable to fetch list of images",
      },
    });
  }
};
