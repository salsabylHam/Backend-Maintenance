import { Injectable } from '@nestjs/common';
import { UpdateOrderTechnicianDto } from './dto/update-order_technician.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderTechnician } from './entities/order_technician.entity';
import { Repository } from 'typeorm';
import { CustomErrorException } from 'src/shared/errors/custom-error.exception';
import { OrderTechnicianPieces } from 'src/order-technician-pieces/entities/order-technician-pieces.entity';
import * as _ from 'lodash';
@Injectable()
export class OrderTechniciansService {
  constructor(
    @InjectRepository(OrderTechnician)
    private readonly orderTechniciansRepository: Repository<OrderTechnician>,
    @InjectRepository(OrderTechnicianPieces)
    private readonly orderTechnicianPiecesRepository: Repository<OrderTechnicianPieces>,
  ) {}

  find(query: any) {
    try {
      const { relations, ...where } = query;
      return this.orderTechniciansRepository.find({
        relations: !!relations
          ? Object.keys(relations).reduce((a, v) => ({ ...a, [v]: true }), {})
          : {},
        where: where || {},
      });
    } catch (error) {
      throw new CustomErrorException(error);
    }
  }

  async update(id: number, updateOrderTechnicianDto: UpdateOrderTechnicianDto) {
    try {
      const orderTechnicians = await this.orderTechniciansRepository.findOneBy({
        id,
      });

      if (!orderTechnicians) {
        throw new CustomErrorException({
          status: 404,
          message: `No orderTechnicians found with id ${id}`,
        });
      }

      return Promise.all([
        this.orderTechnicianPiecesRepository.save(
          updateOrderTechnicianDto.pieces,
        ),
        this.orderTechniciansRepository.save({
          ..._.omit(updateOrderTechnicianDto, ['pieces']),
          id,
        }),
      ]);
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }

  remove(id: number) {
    return this.orderTechniciansRepository.delete(id);
  }
}
