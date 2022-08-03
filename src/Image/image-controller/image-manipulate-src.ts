import { Request, Response, NextFunction } from "express";
const bucketName = process.env.AWS_S3_BUCKET;
const region = "us-east-1";
const accessKey = process.env.AWS_ACCESS_KEY_ID;
const secretKey = process.env.AWS_SECRET_ACCESS_KEY;
const sharp = require("sharp");

/**
 * @dev user specifies name and what manipulation is intended
 * function fetches image from S3 Bucket based on 'key'
 * image is returned to user
 * User can also specify in request body or params to store manipulated image in bucket before returning it
 * 
 * @dev needs to refactor filter Int into utils
 * @dev needs to refactor for aws S3 class
 */

const aws = require("aws-sdk");
aws.config.update({ region: "us-east-1" });

const s3 = new aws.S3({
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
  region: region,
});

const filterInt = (value: string) => {
  if (/^[-+]?(\d+|Infinity)$/.test(value)) {
    return Number(value);
  } else {
    return NaN;
  }
};

export const manipulateImageFromS3 = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const baseImageKey = req.query.Key;
  const saveEdit: boolean = req.query.save ? true : false;
  const manipulation = req.query.manipulation;
  const angle = 90;
  const height = req.query.height ? filterInt(req.query.height) : "";
  const width = req.query.width ? filterInt(req.query.width) : "";

  const bucketParams = {
    Bucket: bucketName,
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
       * @dev Needs Refactor to use S3 class static methods
       */

      if (manipulation != undefined && manipulation === "rotate") {
        sharp(data.Body)
          .rotate(angle)
          .toBuffer(function (err: any, outputBuffer: any, info: any) {
            console.log("rotated!", outputBuffer);
            
            if(saveEdit === true) {
                s3.upload({
                    Bucket: bucketName,
                    Key: `Edited${Date.now()}`,
                    Body: outputBuffer,
                  }).promise()
            } else {
                /**
                 * @dev needs handleBuffer() util method to handle buffers in response events
                 */
                res.status(200).json({
                    status: "Success",

                })
            }
            
          });
      } else if (manipulation != undefined && manipulation === "resize") {
        sharp(data.Body)
          .resize(height, width)
          .toBuffer(function (err: any, outputBuffer: any, info: any) {
            console.log(outputBuffer);
          });
      } else if (manipulation != undefined && manipulation === "grayscale") {
        sharp(data.Body)
          .greyscale()
          .toBuffer(function (err: any, outputBuffer: any, info: any) {
            console.log(outputBuffer);
          });
      }
    //   const base64 = Buffer.from(data.Body).toString("base64");
    //   const mimeType = "image/png"; 

      //   res.send(`<img src="data:${mimeType};base64,${base64}"/>`);

      // fs.writeFileSync("../../../public/images", data.body);
      //   res.sendFile('../../../public/images');
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
