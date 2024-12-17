import { Module } from '@nestjs/common';
import { FundsService } from './funds.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fund } from './entities/fund.entity';
import { FundsController } from './funds.controller';
import { FundHousesModule } from 'src/fund-houses/fund-houses.module';
import { FundSchemeTypesModule } from 'src/fund-scheme-types/fund-scheme-types.module';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Fund]),
    FundHousesModule,
    FundSchemeTypesModule,
  ],
  providers: [FundsService],
  controllers: [FundsController],
})
export class FundsModule {}
