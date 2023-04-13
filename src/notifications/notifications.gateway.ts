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
    createNotificationDto.technicians.forEach((userId) => {
      this.server.to(`room.${userId}`).emit('notification', {
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
  async findAll(@MessageBody() { userId }) {
    const notification = await this.notificationsService.findAll(userId);
    this.server.to(`room.${userId}`).emit('notification', notification);
  }

  @SubscribeMessage('joinUserNotificationRoom')
  Join(@MessageBody() { userId }, @ConnectedSocket() client: Socket) {
    client.join(`room.${userId}`);
  }
}
