import { Module } from '@nestjs/common';
import { RequestPartsService } from './request-parts.service';
import { RequestPartsController } from './request-parts.controller';
import { RequestPart } from './entities/request-part.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RequestPart])],
  controllers: [RequestPartsController],
  providers: [RequestPartsService],
  exports: [RequestPartsService, TypeOrmModule],
})
export class RequestPartsModule {}
