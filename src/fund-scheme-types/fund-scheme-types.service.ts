import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FundSchemeType } from './entities/fund-scheme-type.entity';
import { Repository } from 'typeorm';
import { CreateFundSchemeTypeDto } from './dto/create-fund-scheme-type.dto';
import { QueryFundSchemeTypeDto } from './dto/query-fund-scheme-type.dto';

@Injectable()
export class FundSchemeTypesService {
  constructor(
    @InjectRepository(FundSchemeType)
    private readonly fundSchemeTypeRepository: Repository<FundSchemeType>,
  ) {}

  async create(
    createFundSchemeTypeDto: CreateFundSchemeTypeDto,
  ): Promise<FundSchemeType> {
    const fundSchemeType = this.fundSchemeTypeRepository.create(
      createFundSchemeTypeDto,
    );

    return await this.fundSchemeTypeRepository.save(fundSchemeType);
  }

  async findAll(): Promise<FundSchemeType[]> {
    return await this.fundSchemeTypeRepository.find();
  }

  async findOne(
    queryFundSchemeTypeDto: Partial<QueryFundSchemeTypeDto>,
  ): Promise<FundSchemeType | null> {
    return await this.fundSchemeTypeRepository.findOne({
      where: queryFundSchemeTypeDto,
    });
  }
}
