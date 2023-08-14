import { Injectable } from '@nestjs/common';
import { UpdateDemandeDto } from './dto/update-demande.dto';
import { Demande } from './entities/demande.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomErrorException } from 'src/shared/errors/custom-error.exception';
import { WebsocketGatewayService } from 'src/websocket-gateway/websocket-gateway.service';
import * as _ from 'lodash';
@Injectable()
export class DemandeService {
  constructor(
    @InjectRepository(Demande)
    private demandeRepository: Repository<Demande>,
    private readonly webSocketGatewayService: WebsocketGatewayService,
  ) {}

  create(demande: any) {
    try {
      return this.demandeRepository.save(demande).then(() => {
        this.webSocketGatewayService.emitEventWithWS(
          'updateNotificationBadges',
          true,
        );
      });
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }

  async find(query: any) {
    try {
      const { relations, ...where } = query;

      const indexNewData = _.isArray(relations)
        ? relations.indexOf('newData')
        : Object.keys(relations).indexOf('newData');

      if (indexNewData != -1) {
        if (_.isArray(relations)) {
          relations.splice(indexNewData, 1);
        } else {
          delete relations.newData;
        }
        relations.push('orders');
      }

      const requests = await this.demandeRepository.find({
        relations: relations,
        where: where || {},
      });

      if (indexNewData == -1) {
        return requests;
      }

      return requests.map((request) => {
        if (!request?.orders?.length) {
          request['isNewData'] = true;
        }

        return _.omit(request, 'orders');
      });
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }

  async update(id: number, updateDemandeDto: UpdateDemandeDto) {
    try {
      const demande = await this.demandeRepository.findOneBy({ id });
      if (!demande) {
        throw new CustomErrorException({
          status: 404,
          message: `No demande found with id ${id}`,
        });
      }
      return this.demandeRepository
        .save(this.demandeRepository.create({ ...updateDemandeDto, id }))
        .then(() => {
          this.webSocketGatewayService.emitEventWithWS(
            'updateNotificationBadges',
            true,
          );
        });
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }

  remove(id: number) {
    return this.demandeRepository.delete({ id });
  }
}
