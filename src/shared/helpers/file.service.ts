import { s3client } from './storage.config';
import { CopyObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

export const moveFile = async (src: string, dest: string) => {
  try {
    const moveCommande = new CopyObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      CopySource: src,
      Key: dest,
    });
    return await s3client.send(moveCommande);
  } catch (err) {
    throw err;
  }
};

export const removeFile = async (src: string) => {
  try {
    const moveCommande = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: src,
    });
    return await s3client.send(moveCommande);
  } catch (err) {
    throw err;
  }
};
