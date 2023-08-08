import { Module, forwardRef } from '@nestjs/common';
import { WebsocketGatewayService } from './websocket-gateway.service';
import { WebSocketGatewayGateway } from './websocket.gateway';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [forwardRef(() => NotificationsModule)],
  providers: [WebsocketGatewayService, WebSocketGatewayGateway],
  exports: [WebsocketGatewayService],
})
export class WebsocketGatewayModule {}
