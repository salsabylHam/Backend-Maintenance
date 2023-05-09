import { S3Client } from '@aws-sdk/client-s3';
import * as multerS3 from 'multer-s3';
import 'dotenv/config';

export const s3client = new S3Client({
  forcePathStyle: true,
  endpoint: {
    protocol: process.env.S3_PROTOCOL,
    hostname: process.env.S3_HOSTNAME,
    port: process.env.S3_PORT,
    path: '',
  } as any,
  region: process.env.S3_REGION,
  credentials: process.env.S3_ISLOCAL
    ? {
        accessKeyId: process.env.S3_ACCESSKEY,
        secretAccessKey: process.env.S3_SECRETKEY,
      }
    : null,
});

export const storage = multerS3({
  s3: s3client,
  bucket: process.env.S3_BUCKET_NAME,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, `${Date.now().toString()}-${file.originalname}`);
  },
});
