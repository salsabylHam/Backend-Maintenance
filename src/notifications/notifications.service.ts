import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UserNotificationsService } from 'src/user-notifications/user-notifications.service';
import { CreateNotificationTransaction } from './transaction/notification.transaction';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly userNotificationService: UserNotificationsService,
    private readonly createNotificationTransaction: CreateNotificationTransaction,
  ) {}
  create(createNotificationDto: CreateNotificationDto) {
    return this.createNotificationTransaction.run(createNotificationDto);
  }

  findAll(userId: number) {
    return this.userNotificationService.find({
      userId,
      relations: { notification: true },
    });
  }
}
