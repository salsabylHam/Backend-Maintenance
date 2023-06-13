import { Injectable } from '@nestjs/common';
import { CreateRequestPartDto } from './dto/create-request-part.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestPart } from './entities/request-part.entity';
import { Repository } from 'typeorm';
import { CustomErrorException } from 'src/shared/errors/custom-error.exception';

@Injectable()
export class RequestPartsService {
  constructor(
    @InjectRepository(RequestPart)
    private readonly requestPartRepository: Repository<RequestPart>,
  ) {}

  createOrUpdate(createRequestPartDto: CreateRequestPartDto[], user: any) {
    try {
      const queries = [];
      for (let index = 0; index < createRequestPartDto.length; index++) {
        const requestPart = createRequestPartDto[index];

        queries.push(
          this.requestPartRepository.save({
            ...requestPart,
            userId: requestPart.userId ?? user.id,
          }),
        );
      }

      return Promise.all(queries);
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }

  async findAll(query?: any) {
    return this.requestPartRepository.find({
      where: query || {},
    });
  }

  remove(id: number) {
    return this.requestPartRepository.delete(id);
  }
}
