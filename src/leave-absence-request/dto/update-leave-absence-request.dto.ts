import { PartialType } from '@nestjs/swagger';
import { CreateLeaveAbsenceRequestDto } from './create-leave-absence-request.dto';

export class UpdateLeaveAbsenceRequestDto extends PartialType(
  CreateLeaveAbsenceRequestDto,
) {}
