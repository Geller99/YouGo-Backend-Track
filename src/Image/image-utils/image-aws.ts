export class AWSInternal {
  static bucketName = process.env.AWS_S3_BUCKET;
  static region = "us-east-1";
  static accessKey = process.env.AWS_ACCESS_KEY_ID;
  static secretKey = process.env.AWS_SECRET_ACCESS_KEY;

  static uploadItemToS3(s3: any, data: any, bucketName: string | undefined) {
    return s3
      .upload({
        Bucket: bucketName,
        Key: `newUpload${Date.now()}`,
        Body: data,
      })
      .promise();
  }

  static downloadItemFromS3() {}
}
