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
    try {
      return this.pieceRepository.save(createPieceDto);
    } catch (error) {
      throw new CustomErrorException(error);
    }
  }

  async find(query) {
    try {
      const { relations, ...where } = query;
      return await this.pieceRepository.find({
        relations: !!relations
          ? Object.keys(relations).reduce((a, v) => ({ ...a, [v]: true }), {})
          : {},
        where: where || {},
      });
    } catch (error) {
      throw new CustomErrorException(error);
    }
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
