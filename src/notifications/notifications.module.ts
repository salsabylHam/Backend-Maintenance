import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsGateway } from './notifications.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { UserNotificationsModule } from 'src/user-notifications/user-notifications.module';

@Module({
  imports: [TypeOrmModule.forFeature([Notification]), UserNotificationsModule],
  providers: [NotificationsGateway, NotificationsService],
})
export class NotificationsModule {}
