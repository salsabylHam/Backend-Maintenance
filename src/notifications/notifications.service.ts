import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UserNotificationsService } from 'src/user-notifications/user-notifications.service';
import { CreateNotificationTransaction } from './transaction/notification.transaction';
import { OrderService } from 'src/order/order.service';
import { RequestPartsService } from 'src/request-parts/request-parts.service';
import { DemandeService } from 'src/demande/demande.service';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly userNotificationService: UserNotificationsService,
    private readonly createNotificationTransaction: CreateNotificationTransaction,
    private readonly ordersService: OrderService,
    private readonly requestPartsService: RequestPartsService,
    private readonly demandeService: DemandeService,
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

  async nbrOfUnseenElements(user: any) {
    const stats: any = {};

    if (user.role.code == 'TECHNICIANS_ROLE') {
      stats.nbOrders = (
        await this.ordersService.find({
          relations: { orderTechnician: true },
          orderTechnician: { userId: user.id, status: 'ToDo' },
          occurrence: 'Once',
        })
      ).length;
    }

    if (user.role.code != 'TECHNICIANS_ROLE') {
      stats.nbRequestedParts = (
        await this.requestPartsService.findAll({ status: 'Waiting' })
      ).length;
    }

    stats.nbRequests = (
      await this.demandeService.find({ relations: { orders: true } })
    ).filter((el) => !el.orders.length).length;

    return stats;
  }
}
