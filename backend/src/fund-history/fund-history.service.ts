import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format } from 'date-fns';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateFundHistoryDto } from './dto/create-fund-history.dto';
import { QueryFundHistoryDto } from './dto/query-fund-history.dto';
import { FundHistory } from './entities/fund-history.entity';

@Injectable()
export class FundHistoryService {
  constructor(
    @InjectRepository(FundHistory)
    private readonly fundHistoryRepository: Repository<FundHistory>,
  ) {}

  async bulkCreate(fundHistoryList: CreateFundHistoryDto[]) {
    // const result = await this.fundHistoryRepository.insert(fundHistoryList);

    const result = await this.fundHistoryRepository.upsert(fundHistoryList, [
      'date',
      'fundSchemeCode',
    ]);

    console.log(result.identifiers.length, ' funds history data added');
  }

  async findOne(queryFundHistoryDto: QueryFundHistoryDto) {
    const query: FindOptionsWhere<FundHistory> = {};

    if (queryFundHistoryDto.date) {
      query.date = format(queryFundHistoryDto.date, 'dd-MMM-yyyy');
    }

    if (queryFundHistoryDto.fundSchemeCode) {
      query.fundSchemeCode = queryFundHistoryDto.fundSchemeCode;
    }

    let fundHistory = await this.fundHistoryRepository.findOne({
      where: query,
    });

    if (!fundHistory && queryFundHistoryDto.fundSchemeCode) {
      fundHistory = await this.fundHistoryRepository.findOne({
        where: { fundSchemeCode: queryFundHistoryDto.fundSchemeCode },
        order: { date: 'DESC' },
      });
    }

    return fundHistory;
  }
}
