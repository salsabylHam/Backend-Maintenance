import { Injectable } from '@nestjs/common';
import { CreateUserNotificationDto } from './dto/create-user-notification.dto';
import { UpdateUserNotificationDto } from './dto/update-user-notification.dto';
import { Repository } from 'typeorm';
import { UserNotification } from './entities/user-notification.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserNotificationsService {
  constructor(
    @InjectRepository(UserNotification)
    private readonly userNotificationRepository: Repository<UserNotification>,
  ) {}
  find(querry) {
    return this.userNotificationRepository.find({query});
  }
}
