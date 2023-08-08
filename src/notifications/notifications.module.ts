import { Module, forwardRef } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { UserNotificationsModule } from 'src/user-notifications/user-notifications.module';
import { CreateNotificationTransaction } from './transaction/notification.transaction';
import { DemandeModule } from 'src/demande/demande.module';
import { OrderModule } from 'src/order/order.module';
import { RequestPartsModule } from 'src/request-parts/request-parts.module';
import { NotificationController } from './notification.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    UserNotificationsModule,
    DemandeModule,
    RequestPartsModule,
    forwardRef(() => OrderModule),
  ],
  controllers: [NotificationController],
  providers: [NotificationsService, CreateNotificationTransaction],
  exports: [NotificationsService],
})
export class NotificationsModule {}
