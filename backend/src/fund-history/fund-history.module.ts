import { Module } from '@nestjs/common';
import { FundHistoryService } from './fund-history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FundHistory } from './entities/fund-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FundHistory])],
  providers: [FundHistoryService],
  exports: [FundHistoryService],
})
export class FundHistoryModule {}
