import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LeaveAbsenceRequestService } from './leave-absence-request.service';
import { CreateLeaveAbsenceRequestDto } from './dto/create-leave-absence-request.dto';
import { UpdateLeaveAbsenceRequestDto } from './dto/update-leave-absence-request.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@Controller('leave-absence-request')
@UseGuards(AuthGuard('jwt'))
@ApiTags('machine')
export class LeaveAbsenceRequestController {
  constructor(
    private readonly leaveAbsenceRequestService: LeaveAbsenceRequestService,
  ) {}

  @Post()
  create(@Body() createLeaveAbsenceRequestDto: CreateLeaveAbsenceRequestDto) {
    return this.leaveAbsenceRequestService.create(createLeaveAbsenceRequestDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.leaveAbsenceRequestService.findAll(query);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLeaveAbsenceRequestDto: UpdateLeaveAbsenceRequestDto,
  ) {
    return this.leaveAbsenceRequestService.update(
      +id,
      updateLeaveAbsenceRequestDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leaveAbsenceRequestService.remove(+id);
  }
}
