import { Injectable } from '@nestjs/common';
import { CreateUserNotificationDto } from './dto/create-user-notification.dto';
import { UpdateUserNotificationDto } from './dto/update-user-notification.dto';
import { Repository } from 'typeorm';
import { UserNotification } from './entities/user-notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomErrorException } from 'src/shared/errors/custom-error.exception';

@Injectable()
export class UserNotificationsService {
  constructor(
    @InjectRepository(UserNotification)
    private readonly userNotificationRepository: Repository<UserNotification>,
  ) {}

  find(query) {
    try {
      const { relations, ...where } = query;
      return this.userNotificationRepository.find({
        relations: !!relations
          ? Object.keys(relations).reduce((a, v) => ({ ...a, [v]: true }), {})
          : {},
        where: where || {},
      });
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }
}
