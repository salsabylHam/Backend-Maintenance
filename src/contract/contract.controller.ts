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
  constructor(private readonly contractService: ContractService) {}

  @Post()
  create(@Body() createContractDto: CreateContractDto) {
    return this.contractService.create(createContractDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.contractService.findAll(query);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateContractDto: UpdateContractDto,
  ) {
    return this.contractService.update(+id, updateContractDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractService.remove(+id);
  }
}
