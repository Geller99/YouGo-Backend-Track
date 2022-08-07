"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSInternal = void 0;
class AWSInternal {
    static uploadItemToS3(s3, data, bucketName) {
        return s3
            .upload({
            Bucket: bucketName,
            Key: `newUpload${Date.now()}`,
            Body: data,
        })
            .promise();
    }
    static downloadItemFromS3() { }
}
exports.AWSInternal = AWSInternal;
AWSInternal.bucketName = process.env.AWS_S3_BUCKET;
AWSInternal.region = "us-east-1";
AWSInternal.accessKey = process.env.AWS_ACCESS_KEY_ID;
AWSInternal.secretKey = process.env.AWS_SECRET_ACCESS_KEY;
