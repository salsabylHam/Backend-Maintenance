import { Injectable } from '@nestjs/common';
import { CreatePieceDto } from './dto/create-piece.dto';
import { UpdatePieceDto } from './dto/update-piece.dto';
import { Piece } from './entities/piece.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PieceService {
  constructor(
    @InjectRepository(Piece)
    private pieceRepository: Repository<Piece>,
  ) {}
  create(createPieceDto: CreatePieceDto) {
    return this.pieceRepository.save(createPieceDto);
  }

  async find(query) {
    const { relations, ...where } = query;
    return this.pieceRepository.find({
      relations: relations || {},
      where: where || {},
    });
  }
  update(id: number, updatePieceDto: UpdatePieceDto) {
    const piece = this.pieceRepository.findOneBy({ id });
    if (piece) {
      return this.pieceRepository.update(id, updatePieceDto);
    } else {
      return 'piece does not exist !';
    }
  }

  remove(id: number) {
    return this.pieceRepository.delete(id);
  }
}
