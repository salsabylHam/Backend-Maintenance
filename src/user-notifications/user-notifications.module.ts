import { Module } from '@nestjs/common';
import { UserNotificationsService } from './user-notifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserNotification } from './entities/user-notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserNotification])],
  providers: [UserNotificationsService],
})
export class UserNotificationsModule {}
