import { Module } from '@nestjs/common';
import { MachinePiecesService } from './machine-pieces.service';
import { MachinePicesController } from './machine-pieces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MachinePiece } from './entities/machine-pice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MachinePiece])],
  controllers: [MachinePicesController],
  providers: [MachinePiecesService],
})
export class MachinePicesModule {}
