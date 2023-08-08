import {
  Controller,
  Get,
  Query,
  UseGuards,
  Res,
  Post,
  Body,
  Header,
} from '@nestjs/common';
import { TimeTrackingService } from './time-tracking.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import * as path from 'path';

@Controller('time-tracking')
@ApiTags('time-tracking')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class TimeTrackingController {
  constructor(private readonly timeTrackingService: TimeTrackingService) {}

  @Get()
  getTechniciansWorktime(@Query() query: any) {
    return this.timeTrackingService.getTechniciansWorktime(query);
  }

  @Post('/download')
  @Header('Content-Type', 'text/xlsx')
  @Header('Access-Control-Expose-Headers', 'Content-Disposition')
  async downloadExcel(@Res() res: Response, @Body() data: any) {
    const filePath: string = (await this.timeTrackingService.exportDataToExcel(
      data,
    )) as string;
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${path.basename(filePath)}`,
    );
    res.sendFile(filePath as string);
  }
}
