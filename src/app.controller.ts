import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  FileTypeValidator,
  ParseFilePipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from './shared/helpers/storage.config';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage }))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|pdf)$/ }),
        ],
      }),
    )
    file: any,
  ) {
    return file;
  }
}
