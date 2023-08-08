import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class WebsocketGatewayService {
  public wsServer: Server = null;

  emitEventWithWS(eventName: string, data: any, room?: any) {
    if (room) {
      this.wsServer.to(room).emit(eventName, data);
    } else {
      this.wsServer.emit(eventName, data);
    }
  }
}
