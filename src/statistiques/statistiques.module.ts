import { Module } from '@nestjs/common';
import { StatistiquesService } from './statistiques.service';
import { StatistiquesController } from './statistiques.controller';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [OrderModule],
  controllers: [StatistiquesController],
  providers: [StatistiquesService],
})
export class StatistiquesModule {}
