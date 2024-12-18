import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FundHistoryModule } from 'src/fund-history/fund-history.module';
import { FundHousesModule } from 'src/fund-houses/fund-houses.module';
import { FundSchemeTypesModule } from 'src/fund-scheme-types/fund-scheme-types.module';
import { Fund } from './entities/fund.entity';
import { FundsController } from './funds.controller';
import { FundsService } from './funds.service';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Fund]),
    FundHousesModule,
    FundSchemeTypesModule,
    FundHistoryModule,
  ],
  providers: [FundsService],
  controllers: [FundsController],
})
export class FundsModule {}
