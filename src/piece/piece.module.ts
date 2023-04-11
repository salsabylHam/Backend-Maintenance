import { Module } from '@nestjs/common';
import { PieceService } from './piece.service';
import { PieceController } from './piece.controller';
import { Piece } from './entities/piece.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Piece])],
  controllers: [PieceController],
  providers: [PieceService],
})
export class PieceModule {}
