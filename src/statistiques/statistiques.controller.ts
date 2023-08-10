import { Controller, Get, UseGuards } from '@nestjs/common';
import { StatistiquesService } from './statistiques.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@Controller('statistiques')
@ApiTags('statistiques')
@UseGuards(AuthGuard('jwt'))
export class StatistiquesController {
  constructor(private readonly statistiquesService: StatistiquesService) {}

  @Get('/nbr-of-orders-by-year')
  getnbrOfOrdersByYear() {
    return this.statistiquesService.getnbrOfOrdersByYear();
  }
}
