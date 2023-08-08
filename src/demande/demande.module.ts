import { Module, forwardRef } from '@nestjs/common';
import { DemandeService } from './demande.service';
import { DemandeController } from './demande.controller';
import { Demande } from './entities/demande.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebsocketGatewayModule } from 'src/websocket-gateway/websocket-gateway.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Demande]),
    forwardRef(() => WebsocketGatewayModule),
  ],
  controllers: [DemandeController],
  providers: [DemandeService],
  exports: [DemandeService],
})
export class DemandeModule {}
