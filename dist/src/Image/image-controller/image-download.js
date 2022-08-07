"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImageByName = void 0;
const aws = require("aws-sdk");
const bucketName = process.env.AWS_S3_BUCKET;
const region = "us-east-1";
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
const getImageByName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const baseImageKey = req.query.Key;
    const bucketParams = {
        Bucket: bucketName,
        Key: baseImageKey,
    };
    try {
        s3.getObject(bucketParams, (err, data) => {
            if (err)
                console.error(err);
            const base64 = Buffer.from(data.Body).toString("base64");
            const mimeType = "image/png"; // e.g., image/png
            res.send(`<img src="data:${mimeType};base64,${base64}"/>`);
            // fs.writeFileSync("../../../public/images", data.body);
            //   res.sendFile('../../../public/images');
        });
    }
    catch (error) {
        res.status(400).json({
            status: "failed",
            data: {
                user: "unable to fetch image",
            },
        });
    }
});
exports.getImageByName = getImageByName;
