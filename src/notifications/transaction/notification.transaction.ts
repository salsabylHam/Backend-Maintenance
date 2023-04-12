import { BaseTransaction } from 'src/shared/transaction/base.transaction';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { Connection, EntityManager } from 'typeorm';
import { UserNotification } from 'src/user-notifications/entities/user-notification.entity';
import { Notification } from '../entities/notification.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateNotificationTransaction extends BaseTransaction<
  CreateNotificationDto,
  {
    userNotification: {
      id: number;
      userId: number;
      vue: boolean;
      notificationId: number;
    }[];
    id: number;
    title: string;
    discription: string;
  }
> {
  constructor(connection: Connection) {
    super(connection);
  }

  // the important thing here is to use the manager that we've created in the base class
  protected async execute(
    notificationDTO: CreateNotificationDto,
    manager: EntityManager,
  ): Promise<{
    userNotification: {
      id: number;
      userId: number;
      vue: boolean;
      notificationId: number;
    }[];
    id: number;
    title: string;
    discription: string;
  }> {
    const { technicians, ...notificationData } = notificationDTO;
    const notification = await manager.create(Notification, {
      discription: notificationData.discription,
      title: notificationData.title,
    });
    const userNotification = await Promise.all(
      technicians.map(async (userId) => {
        return await manager.create(UserNotification, {
          userId: userId,
          vue: false,
          notificationId: notification.id,
        });
      }),
    );

    return {
      ...notification,
      userNotification,
    };
  }
}
