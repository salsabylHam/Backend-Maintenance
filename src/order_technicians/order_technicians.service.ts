import { Injectable } from '@nestjs/common';
import { CreateOrderTechnicianDto } from './dto/create-order_technician.dto';
import { UpdateOrderTechnicianDto } from './dto/update-order_technician.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderTechnician } from './entities/order_technician.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderTechniciansService {
  constructor(
    @InjectRepository(OrderTechnician)
    private readonly orderTechniciansRepository: Repository<OrderTechnician>,
  ) {}

  find(query: any) {
    const { relations, ...where } = query;
    return this.orderTechniciansRepository.find({
      relations:
        Object.keys(relations).reduce((a, v) => ({ ...a, [v]: true }), {}) ||
        {},
      where: where || {},
    });
  }

  update(id: number, updateOrderTechnicianDto: UpdateOrderTechnicianDto) {
    return this.orderTechniciansRepository.update(
      { id },
      updateOrderTechnicianDto,
    );
  }

  remove(id: number) {
    return this.orderTechniciansRepository.delete(id);
  }
}
