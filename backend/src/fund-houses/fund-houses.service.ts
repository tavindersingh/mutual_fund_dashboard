import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { CreateFundHouseDto } from './dto/create-fund-house.dto';
import { FundHouse } from './entities/fund-house.entity';
import { QueryFundHouseDto } from './dto/query-fund-house.dto';

@Injectable()
export class FundHousesService {
  constructor(
    @InjectRepository(FundHouse)
    private readonly fundHouseRepository: Repository<FundHouse>,
  ) {}

  async create(createFundHouseDto: CreateFundHouseDto): Promise<FundHouse> {
    const fundHouse = this.fundHouseRepository.create(createFundHouseDto);
    return this.fundHouseRepository.save(fundHouse);
  }

  async findAll(name?: string): Promise<FundHouse[]> {
    const query: FindOptionsWhere<FundHouse> = {};

    if (name) {
      query.name = Like(`%${name}%`);
    }

    return this.fundHouseRepository.find({
      where: query,
    });
  }

  async findOne(
    queryFundHouseDto: Partial<QueryFundHouseDto>,
  ): Promise<FundHouse | null> {
    const query: FindOptionsWhere<FundHouse> = {};

    if (queryFundHouseDto.id) {
      query.id = queryFundHouseDto.id;
    }

    if (queryFundHouseDto.name) {
      query.name = Like(`%${queryFundHouseDto.name}%`);
    }

    return this.fundHouseRepository.findOne({
      where: query,
    });
  }
}
