import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class NotificationsGateway {
  constructor(private readonly notificationsService: NotificationsService) {}

  @SubscribeMessage('createNotification')
  create(@MessageBody() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
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
