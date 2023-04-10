import { Module } from '@nestjs/common';
import { DemandeService } from './demande.service';
import { DemandeController } from './demande.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Demande } from './entities/demande.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Demande])],
  controllers: [DemandeController],
  providers: [DemandeService],
})
export class DemandeModule {}
