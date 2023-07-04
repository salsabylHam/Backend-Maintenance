import { Injectable } from '@nestjs/common';
import { CreateLeaveAbsenceRequestDto } from './dto/create-leave-absence-request.dto';
import { UpdateLeaveAbsenceRequestDto } from './dto/update-leave-absence-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { LeaveAbsenceRequest } from './entities/leave-absence-request.entity';
import * as _ from 'lodash';

@Injectable()
export class LeaveAbsenceRequestService {
  constructor(
    @InjectRepository(LeaveAbsenceRequest)
    private readonly leaveAbsenceRequestRepository: Repository<LeaveAbsenceRequest>,
  ) {}

  create(createLeaveAbsenceRequestDto: CreateLeaveAbsenceRequestDto) {
    const q = [];
    const technicianId = createLeaveAbsenceRequestDto.technicianId;

    createLeaveAbsenceRequestDto = _.omit(createLeaveAbsenceRequestDto, [
      'technicianId',
    ]);

    for (let index = 0; index < technicianId.length; index++) {
      const techId = technicianId[index];
      q.push(
        this.leaveAbsenceRequestRepository.save(
          Object.assign(createLeaveAbsenceRequestDto, { technicianId: techId }),
        ),
      );
    }

    return Promise.all(q);
  }

  findAll(query: any) {
    const { relations, ...where } = query;

    if (_.isArray(where.technicianId)) {
      where.technicianId = In(where.technicianId);
    }

    return this.leaveAbsenceRequestRepository.find({
      relations: relations,
      where: where || {},
    });
  }

  update(
    id: number,
    updateLeaveAbsenceRequestDto: UpdateLeaveAbsenceRequestDto,
  ) {
    const q = [];
    const technicianId = updateLeaveAbsenceRequestDto.technicianId;

    updateLeaveAbsenceRequestDto = _.omit(updateLeaveAbsenceRequestDto, [
      'technicianId',
    ]);
    if (technicianId && technicianId.length) {
      for (let index = 0; index < technicianId.length; index++) {
        const techId = technicianId[index];
        q.push(
          this.leaveAbsenceRequestRepository.update(
            id,
            Object.assign(updateLeaveAbsenceRequestDto, {
              technicianId: techId,
            }),
          ),
        );
      }
    } else {
      q.push(
        this.leaveAbsenceRequestRepository.update(
          id,
          _.omit(updateLeaveAbsenceRequestDto, [technicianId]),
        ),
      );
    }

    return Promise.all(q);
  }

  remove(id: number) {
    return this.leaveAbsenceRequestRepository.delete({ id });
  }
}
