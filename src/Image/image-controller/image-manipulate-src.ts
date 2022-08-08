import { AWSInternal } from "./../image-utils/image-aws";
import { Request, Response, NextFunction } from "express";
import { Image } from "../image-utils/image-utils";

/**
 * @dev user specifies name and what manipulation is intended
 * function fetches image from S3 Bucket based on 'key'
 * image is returned to user
 * User can also specify in request body or params to store manipulated image in bucket before returning it
 *
 */

const aws = require("aws-sdk");
aws.config.update({ region: "us-east-1" });

const s3 = new aws.S3({
  accessKeyId: AWSInternal.accessKey,
  secretAccessKey: AWSInternal.secretKey,
  region: AWSInternal.region,
});

export const manipulateImageFromS3 = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const baseImageKey = req.query.Key;
  const saveEdit: boolean = req.query.save ? true : false;
  const manipulation = req.query.manipulation;
  const angle = 90;
  const height = req.query.height ? Image.filterInt(req.query.height) : 50;
  const width = req.query.width ? Image.filterInt(req.query.width) : 50;

  const bucketParams = {
    Bucket: AWSInternal.bucketName,
    Key: baseImageKey,
  };

  try {
    s3.getObject(bucketParams, (err: any, data: any) => {
      if (err) console.error(err);

      /**
       * @dev checks query param to determine what manipulation user needs on the fetched image
       *
       * @dev uses saveEdit Boolean to determine if manipulated image needs to be stored on S3 or not
       *
       * @dev uploads manipulated image to S3 then returns image to user
       */
      if (manipulation != undefined && manipulation === "rotate") {
        console.log(data);
        console.log(AWSInternal.accessKey);
        Image.rotatePhoto(data.Body, angle).then(async (data: any) => {
          const result = await data.toBuffer();
          if (saveEdit === true) {
            AWSInternal.uploadItemToS3(s3, result, AWSInternal.bucketName);
          }
          Image.convertBufferToImage(res, result);
        });
      } else if (manipulation != undefined && manipulation === "resize") {
        Image.resizePhoto(data.Body, height, width).then(async (data: any) => {
          const result = await data.toBuffer();
          if (saveEdit === true) {
            AWSInternal.uploadItemToS3(s3, result, AWSInternal.bucketName);
          }
          Image.convertBufferToImage(res, result);
        });
      } else if (manipulation != undefined && manipulation === "grayscale") {
        Image.grayscalePhoto(data.Body).then(async (data: any) => {
          const result = await data.toBuffer();
          if (saveEdit === true) {
            AWSInternal.uploadItemToS3(s3, result, AWSInternal.bucketName);
          }
          Image.convertBufferToImage(res, result);
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      data: {
        user: "unable to fetch image",
      },
    });
  }
};
