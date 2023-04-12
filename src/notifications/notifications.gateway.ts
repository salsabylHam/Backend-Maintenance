import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class NotificationsGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly notificationsService: NotificationsService) {}

  @SubscribeMessage('createNotification')
  async create(@MessageBody() createNotificationDto: CreateNotificationDto) {
    const notification = await this.notificationsService.create(
      createNotificationDto,
    );
    createNotificationDto.technicians.forEach(async (userId) => {
      this.server.to(`$room.${userId}`).emit('notification', {
        id: notification.userNotification.find(
          (userNotification) => userNotification.userId == userId,
        ).notificationId,
        title: notification.title,
        discription: notification.discription,
        vue: false,
      });
    });
  }

  @SubscribeMessage('findAllUserNotifications')
  findAll(@MessageBody() userId: number) {
    return this.notificationsService.findAll(userId);
  }

  @SubscribeMessage('joinUserNotificationRoom')
  Join(@MessageBody() userId: number, @ConnectedSocket() client: Socket) {
    client.join(`$room.${userId}`);
  }
}
