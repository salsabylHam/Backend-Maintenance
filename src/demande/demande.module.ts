import { Module } from '@nestjs/common';
import { DemandeService } from './demande.service';
import { DemandeController } from './demande.controller';
import { Demande } from './entities/demande.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Demande])],
  controllers: [DemandeController],
  providers: [DemandeService],
})
export class DemandeModule {}
