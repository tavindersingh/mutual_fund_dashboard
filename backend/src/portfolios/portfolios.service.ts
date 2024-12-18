import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FundHistoryService } from 'src/fund-history/fund-history.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { QueryPortfolioDto } from './dto/query-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { Portfolio } from './entities/portfolio.entity';
import { Fund } from 'src/funds/entities/fund.entity';
import { FundHistory } from 'src/fund-history/entities/fund-history.entity';

@Injectable()
export class PortfoliosService {
  constructor(
    @InjectRepository(Portfolio)
    private readonly portfolioRepository: Repository<Portfolio>,
    private readonly fundHistoryService: FundHistoryService,
  ) {}

  async create(createPortfolioDto: CreatePortfolioDto) {
    const fundHistoryData = await this.fundHistoryService.findOne({
      fundSchemeCode: createPortfolioDto.schemeCode,
      date: createPortfolioDto.purchaseDate || new Date(),
    });

    if (!fundHistoryData) {
      throw new BadRequestException('Fund Nav data not found');
    }

    const portfolio = this.portfolioRepository.create({
      ...createPortfolioDto,
      purchasePrice: fundHistoryData.netAssetValue,
    });

    return await this.portfolioRepository.save(portfolio);
  }

  async findAll(queryPortfolioDto: QueryPortfolioDto) {
    const query: FindOptionsWhere<Portfolio> = {};

    if (queryPortfolioDto.userId) {
      query.userId = queryPortfolioDto.userId;
    }

    return await this.portfolioRepository.find({
      where: query,
      relations: ['fund', 'fund.fundHouse', 'fund.fundSchemeType'],
    });
  }

  async getUserPortfolioData(queryPortfolioDto: QueryPortfolioDto) {
    const portfolioData = await this.portfolioRepository
      .createQueryBuilder('portfolio')
      .select([
        'portfolio.schemeCode',
        'fund.schemeName',
        'fundHouse.id AS fundHouse_id',
        'fundHouse.name AS fundHouse_name',
        'fundSchemeType.id AS fundSchemeType_id',
        'fundSchemeType.name AS fundSchemeType_name',
        'fundHistory.netAssetValue',
        'SUM(portfolio.units) AS totalUnits',
        'SUM(portfolio.units * portfolio.purchasePrice) AS totalOriginalPrice',
        '(SUM(portfolio.units) * fundHistory.netAssetValue) AS totalCurrentValue',
      ])
      .innerJoin(Fund, 'fund', 'portfolio.schemeCode = fund.schemeCode')
      .innerJoin('fund.fundHouse', 'fundHouse')
      .innerJoin('fund.fundSchemeType', 'fundSchemeType')
      .innerJoin(
        (qb) =>
          qb
            .select(['fundSchemeCode', 'MAX(date) AS latestDate'])
            .from(FundHistory, 'fund_history')
            .groupBy('fundSchemeCode'),
        'latest',
        'portfolio.schemeCode = latest.fundSchemeCode',
      )
      .innerJoin(
        FundHistory,
        'fundHistory',
        'fundHistory.fundSchemeCode = latest.fundSchemeCode AND fundHistory.date = latest.latestDate',
      )
      .where('portfolio.userId = :userId', { userId: queryPortfolioDto.userId })
      .groupBy(
        'portfolio.schemeCode, fund.schemeName, fundHouse.id, fundHouse.name, fundSchemeType.id, fundSchemeType.name, fundHistory.netAssetValue',
      )
      .getRawMany();

    return portfolioData;
  }

  findOne(id: number) {
    return `This action returns a #${id} portfolio`;
  }

  update(id: number, updatePortfolioDto: UpdatePortfolioDto) {
    return `This action updates a #${id} portfolio`;
  }

  remove(id: number) {
    return `This action removes a #${id} portfolio`;
  }
}
