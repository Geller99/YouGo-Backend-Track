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
exports.uploadPhoto = exports.awsUpload = void 0;
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
exports.awsUpload = multer({
    storage: multerS3({
        s3: s3,
        acl: "public-read",
        bucket: bucketName,
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname); //use Date.now() for unique file keys
        },
    }),
});
const uploadPhoto = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        res.status(401);
        return next();
    }
    try {
        res.status(200).json({
            status: "succeeded I guess...",
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            status: "failed",
            data: {
                user: "unable to store image",
            },
        });
    }
});
exports.uploadPhoto = uploadPhoto;
