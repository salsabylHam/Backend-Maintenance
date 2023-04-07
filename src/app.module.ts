import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { OrderModule } from './order/order.module';
import { DemandeModule } from './demande/demande.module';
import { DamageGroupModule } from './damage-group/damage-group.module';
import { DamageCodeModule } from './damage-code/damage-code.module';
import { MachineModule } from './machine/machine.module';
import { PieceModule } from './piece/piece.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UsersModule, OrderModule, DemandeModule, DamageGroupModule, DamageCodeModule, MachineModule, PieceModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
