import { IsNumber, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsNumber({}, { each: true })
  technicians: number[];
  @IsString()
  title: string;
  @IsString()
  discription: string;
}
