import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, forwardRef, Inject } from '@nestjs/common';
import { WebsocketGatewayService } from './websocket-gateway.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { CreateNotificationDto } from 'src/notifications/dto/create-notification.dto';

@WebSocketGateway({
  cors: {
    origin: process.env.ALLOWED_ORIGIN,
  },
})
export class WebSocketGatewayGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');
  constructor(
    private readonly websocketGatewayService: WebsocketGatewayService,
    @Inject(forwardRef(() => NotificationsService))
    private readonly notificationsService: NotificationsService,
  ) {}

  afterInit(server: Server) {
    this.websocketGatewayService.wsServer = server;
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

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
