import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFundHistoryDto } from './dto/create-fund-history.dto';
import { FundHistory } from './entities/fund-history.entity';

@Injectable()
export class FundHistoryService {
  constructor(
    @InjectRepository(FundHistory)
    private readonly fundHistoryRepository: Repository<FundHistory>,
  ) {}

  async bulkCreate(fundHistoryList: CreateFundHistoryDto[]) {
    const result = await this.fundHistoryRepository.insert(fundHistoryList);

    console.log(result.identifiers.length, ' funds history data added');
  }
}
