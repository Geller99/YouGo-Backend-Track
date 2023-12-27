import { Request, Response, NextFunction } from "express";
const aws = require("aws-sdk");
const bucketName = process.env.AWS_S3_BUCKET;
const region = process.env.AWS_REGION;
const accessKey = process.env.AWS_ACCESS_KEY_ID;
const secretKey = process.env.AWS_SECRET_ACCESS_KEY;

/**
 * @dev creates instance of aws S3 bucket with access keys
 * makes getObject call based on unique 'Key' passed as query params
 * function fetches image from S3, converts to Base64 encoding and returns either as image or HTML 'img' element to user
 */

const s3 = new aws.S3({
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
  region: region,
});

export const getImageByName = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const baseImageKey = req.query.Key;

  const bucketParams = {
    Bucket: bucketName,
    Key: baseImageKey,
  };

  try {
    s3.getObject(bucketParams, (err: any, data: any) => {
      if (err) console.error(err);

      const base64 = Buffer.from(data.Body).toString("base64");
      const mimeType = "image/png"; // e.g., image/png

      res.send(`<img src="data:${mimeType};base64,${base64}"/>`);

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
