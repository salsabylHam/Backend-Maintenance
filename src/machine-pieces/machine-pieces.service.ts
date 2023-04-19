import { Injectable } from '@nestjs/common';
import { CreateMachinePieceDto } from './dto/create-machine-piece.dto';
import { UpdateMachinePieceDto } from './dto/update-machine-piece.dto';
import { MachinePiece } from './entities/machine-pice.entity';
import { Connection, Repository } from 'typeorm';
import { CustomErrorException } from 'src/shared/errors/custom-error.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Machine } from 'src/machine/entities/machine.entity';
import { Piece } from 'src/piece/entities/piece.entity';
@Injectable()
export class MachinePiecesService {
  constructor(
    @InjectRepository(MachinePiece)
    private readonly machinePieceRepository: Repository<MachinePiece>,
    private readonly connection: Connection,
  ) {}

  async create(createMachineDto: CreateMachinePieceDto) {
    try {
      const machinePiece = await this.connection.transaction(
        async (manager) => {
          const { machineId, pieceId } = createMachineDto;

          const machine = await manager.save(Machine, {
            id: machineId,
          });

          const piece = await manager.save(Piece, {
            id: pieceId,
          });

          const machinePiece = await manager.save(MachinePiece, {
            machine,
            piece,
          });

          return machinePiece;
        },
      );

      return machinePiece;
    } catch (error) {
      throw new CustomErrorException(error);
    }
  }
  find(query: any) {
    try {
      const { relations, ...where } = query;
      return this.machinePieceRepository.find({
        relations: !!relations
          ? Object.keys(relations).reduce((a, v) => ({ ...a, [v]: true }), {})
          : {},
        where: where || {},
      });
    } catch (error) {
      throw new CustomErrorException(error);
    }
  }

  // async update(id: number, updateMachinePieceDto: UpdateMachinePieceDto) {
  //   try {
  //     const machinePieces = await this.machinePieceRepository.findOneBy({
  //       id,
  //     });
  //     if (!machinePieces) {
  //       throw new CustomErrorException({
  //         status: 404,
  //         message: `No machinePieces found with id ${id}`,
  //       });
  //     }
  //     return this.machinePieceRepository.update({ id }, updateMachinePieceDto);
  //   } catch (err) {
  //     throw new CustomErrorException(err);
  //   }
  // }

  remove(id: number) {
    return this.machinePieceRepository.delete(id);
  }
}
