import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { Repository } from 'typeorm';
import { s3client } from '../shared/helpers/storage.config';
import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
    private readonly configService: ConfigService,
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

  async getFile(query: any, res: any) {
    try {
      const input = {
        Bucket: this.configService.get('S3_BUCKET_NAME'),
        Key: query.file,
      };
      const command = new GetObjectCommand(input);
      const response = await s3client.send(command);
      (response.Body as any).pipe(res);
    } catch (err) {
      throw err;
    }
  }
}
