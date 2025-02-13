import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { CreateAuthConfigDTO } from 'src/auth-config/dto/create-auth-config.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('enterprise')
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) { }

  @Get('/:code')
  async getEnterprise(@Param('code') code: string) {
    const enterprise = await this.enterpriseService.findAll({
      code,
    });
    if (enterprise.length == 0)
      throw new NotFoundException('404 Enterprise Not Found!');
    return {
      ...enterprise[0],
    };
  }
  @Get('/:code/auth')
  getEnterpriseAuthMethodes(@Param('code') code: string) {
    return this.enterpriseService.getAuthMethode(code);
  }

  @Post('/:code/auth')
  @UseGuards(AuthGuard('jwt'))
  createAuthMethode(
    @Param('code') code,
    @Body() authMethode: CreateAuthConfigDTO,
  ) {
    return this.enterpriseService.addAuthMethode(authMethode, code);
  }

  @Get('/files/statistics')
  @UseGuards(AuthGuard('jwt'))
  getFilesUsageStatistics(@Req() req: any) {

    return this.enterpriseService.fileStatisics(req.user.enterprise.id)
  }
}
