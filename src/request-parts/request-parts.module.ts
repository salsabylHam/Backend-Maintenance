import { Module, forwardRef } from '@nestjs/common';
import { RequestPartsService } from './request-parts.service';
import { RequestPartsController } from './request-parts.controller';
import { RequestPart } from './entities/request-part.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebsocketGatewayModule } from 'src/websocket-gateway/websocket-gateway.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestPart]),
    forwardRef(() => WebsocketGatewayModule),
  ],
  controllers: [RequestPartsController],
  providers: [RequestPartsService],
  exports: [RequestPartsService, TypeOrmModule],
})
export class RequestPartsModule {}
