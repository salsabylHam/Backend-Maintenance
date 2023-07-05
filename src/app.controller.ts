import {
  Controller,
  Post,
  UseInterceptors,
  FileTypeValidator,
  ParseFilePipe,
  UploadedFiles,
  Get,
  Res,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { storage } from './shared/helpers/storage.config';
import { FilesService } from './files/files.service';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private fileService: FilesService,
  ) {}

  @Get('healthz')
  healthz() {
    return { status: 'success' };
  }

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

  @Get('preview')
  async downloadFile(@Res() res: any, @Query() query: any) {
    try {
      return this.fileService.getFile(query, res);
    } catch (error) {
      throw new Error('Error download file from S3');
    }
  }
}
