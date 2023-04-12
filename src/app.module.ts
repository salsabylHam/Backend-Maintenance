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
import { MachinePicesModule } from './machine-pices/machine-pices.module';
import { AuthModule } from './auth/auth.module';
import { OrderTechniciansModule } from './order_technicians/order_technicians.module';
import { NotificationsModule } from './notifications/notifications.module';
import { UserNotificationsModule } from './user-notifications/user-notifications.module';

@Module({
  imports: [
    UsersModule,
    OrderModule,
    DemandeModule,
    DamageGroupModule,
    DamageCodeModule,
    MachineModule,
    PieceModule,
    DatabaseModule,
    MachinePicesModule,
    AuthModule,
    OrderTechniciansModule,
    NotificationsModule,
    UserNotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
