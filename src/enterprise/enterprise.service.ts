import { Injectable, NotFoundException } from '@nestjs/common';
import { Enterprise } from './entities/enterprise.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';
import { CustomErrorException } from 'src/shared/errors/custom-error.exception';
import { CreateAuthConfigDTO } from 'src/auth-config/dto/create-auth-config.dto';
import { AuthConfigService } from 'src/auth-config/auth-config.service';

// we can change the code to be int or string later
type ICodeGenrator<codeType> = () => codeType;

type IEnterpriseCreate<codeType> = {
  codeGenrator: ICodeGenrator<codeType>;
  name: string;
  address: string;
};
@Injectable()
export class EnterpriseService {

  constructor(
    @InjectRepository(Enterprise)
    private readonly enterpriseRepository: Repository<Enterprise>,
    private readonly authConfigService: AuthConfigService,
  ) { }

  create<codeType>(enterprise: IEnterpriseCreate<codeType>) {
    return this.enterpriseRepository.save({
      name: enterprise.name,
      address: enterprise.address,
      code: String(enterprise.codeGenrator()),
    });
  }
  save(enterprise: any) {
    return this.enterpriseRepository.save(enterprise);
  }
  findAll(query: any) {
    return this.enterpriseRepository.find({
      where: _.omit(query, ['relations']),
      relations: query.relations ?? [],
    });
  }
  async addAuthMethode(authMethode: CreateAuthConfigDTO, code: string) {
    const enterprise = await this.findAll({
      code,
    });

    if (enterprise.length == 0)
      throw new NotFoundException('No Enterprise with this name');

    //TODO: Make sure that this save this is enought to make the relation both way
    return this.authConfigService.create(authMethode, enterprise[0]);
  }
  async getAuthMethode(code: string) {
    const enterprise = await this.findAll({
      code,
    });

    if (enterprise.length == 0)
      throw new NotFoundException('No Enterprise with this name');
    return this.authConfigService.findAll(
      {
        enterprise,
      },
      {
        id: true,
        name: true,
        provider: true,
      },
    );
  }
  async fileStatisics(id: any) {
    const enterprise = await this.findAll({
      id,
      relations: ['clients', 'clients.files']
    })
    let space = 0
    enterprise[0].clients.forEach((client) => {
      client.files.forEach((file) => {
        space += file.size
      })
    })
    return {
      space
    }
  }
  async update(id: number, updateEnterpriseDto: any) {
    try {
      const enterprise = await this.enterpriseRepository.findOneBy({ id });
      if (!enterprise) {
        throw new CustomErrorException({
          status: 404,
          message: `Enterprise not found (id: ${id})`,
        });
      }

      return this.enterpriseRepository.update(id, updateEnterpriseDto);
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }
  remove(id: number) {
    return this.enterpriseRepository.delete(id);
  }
}
