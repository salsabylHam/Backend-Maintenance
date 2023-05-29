import {
  Controller,
  Post,
  UseInterceptors,
  FileTypeValidator,
  ParseFilePipe,
  UploadedFiles,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { storage } from './shared/helpers/storage.config';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('file', null, { storage }))
  uploadFile(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|pdf)$/ }),
        ],
      }),
    )
    file: Express.Multer.File[],
  ) {
    return file;
  }
}
