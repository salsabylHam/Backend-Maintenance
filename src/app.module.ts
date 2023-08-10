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
import { AuthModule } from './auth/auth.module';
import { OrderTechniciansModule } from './order_technicians/order_technicians.module';
import { NotificationsModule } from './notifications/notifications.module';
import { UserNotificationsModule } from './user-notifications/user-notifications.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolePermissionsModule } from './role-permissions/role-permissions.module';
import { TeamModule } from './team/team.module';
import { FilesModule } from './files/files.module';
import { OrderTechnicianPiecesModule } from './order-technician-pieces/order-technician-pieces.module';
import { RequestPartsModule } from './request-parts/request-parts.module';
import { LeaveAbsenceRequestModule } from './leave-absence-request/leave-absence-request.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskSchedulingModule } from './task-scheduling/task-scheduling.module';
import { WebsocketGatewayModule } from './websocket-gateway/websocket-gateway.module';
import { TimeTrackingModule } from './time-tracking/time-tracking.module';
import { StatistiquesModule } from './statistiques/statistiques.module';


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
    AuthModule,
    OrderTechniciansModule,
    NotificationsModule,
    UserNotificationsModule,
    RolesModule,
    PermissionsModule,
    RolePermissionsModule,
    TeamModule,
    FilesModule,
    OrderTechnicianPiecesModule,
    RequestPartsModule,
    LeaveAbsenceRequestModule,
    ScheduleModule.forRoot(),
    TaskSchedulingModule,
    WebsocketGatewayModule,
    TimeTrackingModule,
    StatistiquesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
