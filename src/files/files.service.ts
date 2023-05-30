import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { Repository } from 'typeorm';
import { s3client } from '../shared/helpers/storage.config';
import { CopyObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  async moveFile(src: string, dest: string) {
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
  }

  async removeFile(src: string) {
    try {
      const moveCommande = new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: src,
      });
      return await s3client.send(moveCommande);
    } catch (err) {
      throw err;
    }
  }
}
