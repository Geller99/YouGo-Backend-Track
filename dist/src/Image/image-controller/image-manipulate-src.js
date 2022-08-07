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
exports.manipulateImageFromS3 = void 0;
const image_aws_1 = require("./../image-utils/image-aws");
const image_utils_1 = require("../image-utils/image-utils");
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
    accessKeyId: image_aws_1.AWSInternal.accessKey,
    secretAccessKey: image_aws_1.AWSInternal.secretKey,
    region: image_aws_1.AWSInternal.region,
});
const manipulateImageFromS3 = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const baseImageKey = req.query.Key;
    const saveEdit = req.query.save ? true : false;
    const manipulation = req.query.manipulation;
    const angle = 90;
    const height = req.query.height ? image_utils_1.Image.filterInt(req.query.height) : 50;
    const width = req.query.width ? image_utils_1.Image.filterInt(req.query.width) : 50;
    const bucketParams = {
        Bucket: image_aws_1.AWSInternal.bucketName,
        Key: baseImageKey,
    };
    try {
        s3.getObject(bucketParams, (err, data) => {
            if (err)
                console.error(err);
            /**
             * @dev checks query param to determine what manipulation user needs on the fetched image
             *
             * @dev uses saveEdit Boolean to determine if manipulated image needs to be stored on S3 or not
             *
             * @dev uploads manipulated image to S3 then returns image to user
             */
            if (manipulation != undefined && manipulation === "rotate") {
                image_utils_1.Image.rotatePhoto(data.Body, angle).then((data) => __awaiter(void 0, void 0, void 0, function* () {
                    const result = yield data.toBuffer();
                    if (saveEdit === true) {
                        image_aws_1.AWSInternal.uploadItemToS3(s3, result, image_aws_1.AWSInternal.bucketName);
                    }
                    image_utils_1.Image.convertBufferToImage(res, result);
                }));
            }
            else if (manipulation != undefined && manipulation === "resize") {
                image_utils_1.Image.resizePhoto(data.Body, height, width).then((data) => __awaiter(void 0, void 0, void 0, function* () {
                    const result = yield data.toBuffer();
                    if (saveEdit === true) {
                        image_aws_1.AWSInternal.uploadItemToS3(s3, result, image_aws_1.AWSInternal.bucketName);
                    }
                    image_utils_1.Image.convertBufferToImage(res, result);
                }));
            }
            else if (manipulation != undefined && manipulation === "grayscale") {
                image_utils_1.Image.grayscalePhoto(data.Body).then((data) => __awaiter(void 0, void 0, void 0, function* () {
                    const result = yield data.toBuffer();
                    if (saveEdit === true) {
                        image_aws_1.AWSInternal.uploadItemToS3(s3, result, image_aws_1.AWSInternal.bucketName);
                    }
                    image_utils_1.Image.convertBufferToImage(res, result);
                }));
            }
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
exports.manipulateImageFromS3 = manipulateImageFromS3;
