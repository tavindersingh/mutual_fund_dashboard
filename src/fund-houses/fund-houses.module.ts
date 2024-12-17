import { Module } from '@nestjs/common';
import { FundHousesService } from './fund-houses.service';
import { FundHousesController } from './fund-houses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FundHouse } from './entities/fund-house.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FundHouse])],
  controllers: [FundHousesController],
  providers: [FundHousesService],
  exports: [FundHousesService],
})
export class FundHousesModule {}
