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
exports.getListOfPhotosFromS3 = void 0;
const aws = require("aws-sdk");
aws.config.update({ region: "us-east-1" });
const bucketParams = {
    Bucket: "revealapibucket",
};
const s3 = new aws.S3();
// Call S3 to obtain a list of the objects in the bucket
const getListOfPhotosFromS3 = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        yield s3.listObjects(bucketParams, (err, data) => {
            res.status(200).json({
                status: "succeeded I guess...",
                data: data.Contents,
            });
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            status: "failed",
            data: {
                user: "unable to fetch list of images",
            },
        });
    }
});
exports.getListOfPhotosFromS3 = getListOfPhotosFromS3;
