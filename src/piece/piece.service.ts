import { Injectable } from '@nestjs/common';
import { CreatePieceDto } from './dto/create-piece.dto';
import { UpdatePieceDto } from './dto/update-piece.dto';
import { Piece } from './entities/piece.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomErrorException } from 'src/shared/errors/custom-error.exception';

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
  async update(id: number, updatePieceDto: UpdatePieceDto) {
    try {
      const piece = await this.pieceRepository.findOneBy({ id });
      if (!piece) {
        throw new CustomErrorException({
          status: 404,
          message: `No piece found with id ${id}`,
        });
      }

      return this.pieceRepository.update(id, updatePieceDto);
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }

  remove(id: number) {
    return this.pieceRepository.delete(id);
  }
}
