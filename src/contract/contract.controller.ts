import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('contracts')
@Controller('contracts')
@UseGuards(AuthGuard('jwt'))
export class ContractController {
  constructor(private readonly contractService: ContractService) { }

  @Post()
  create(@Body() createContractDto: CreateContractDto, @Req() req: any) {
    return this.contractService.create(createContractDto, req.user.enterprise.id);
  }

  @Get()
  findAll(@Query() query: any, @Req() req: any) {
    const { relations, ...where } = query;
    console.log(where)
    return this.contractService.findAll({
      ...where,
      enterprise: {
        id: req.user.enterprise.id
      }
      , relations
    });
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateContractDto: UpdateContractDto,
    @Req() req: any
  ) {
    const query = {
      is: +id,
      enterprise: {
        id: req.user.enterprise.id
      }
    }
    return this.contractService.update(query, updateContractDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any
  ) {
    const query = {
      id: +id,
      enterprise: {
        id: req.user.enterprise.id
      }
    }
    return this.contractService.remove(query);
  }
}
