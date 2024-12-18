import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as readline from 'readline';
import { lastValueFrom } from 'rxjs';
import { FundHouse } from 'src/fund-houses/entities/fund-house.entity';
import { FundHousesService } from 'src/fund-houses/fund-houses.service';
import { FundSchemeType } from 'src/fund-scheme-types/entities/fund-scheme-type.entity';
import { FundSchemeTypesService } from 'src/fund-scheme-types/fund-scheme-types.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateFundDto } from './dto/create-fund.dto';
import { QueryFundDto } from './dto/query-fund.dto';
import { Fund } from './entities/fund.entity';
import { FundHistoryService } from 'src/fund-history/fund-history.service';
import { CreateFundHistoryDto } from 'src/fund-history/dto/create-fund-history.dto';

@Injectable()
export class FundsService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Fund) private readonly fundRepository: Repository<Fund>,
    private readonly fundHouseService: FundHousesService,
    private readonly fundSchemeTypeService: FundSchemeTypesService,
    private readonly fundHistoryService: FundHistoryService,
  ) {}

  async createBulk(createFundDtoList: CreateFundDto[]) {
    const result = await this.fundRepository.save(createFundDtoList);

    console.log(result.length, ' funds saved');
  }

  async findAll(queryFundDto: QueryFundDto): Promise<Fund[]> {
    const page = queryFundDto.page || 1;
    const pageSize = queryFundDto.pageSize || 10;

    const skip = (page - 1) * pageSize;

    const query: FindOptionsWhere<Fund> = {};

    if (queryFundDto.fundHouse) {
      const fundHouse = await this.fundHouseService.findOne({
        name: queryFundDto.fundHouse,
      });
      query.fundHouse = fundHouse;
    }

    if (queryFundDto.fundSchemeType) {
      const fundSchemeType = await this.fundSchemeTypeService.findOne({
        name: queryFundDto.fundSchemeType,
      });
      query.fundSchemeType = fundSchemeType;
    }

    return await this.fundRepository.find({
      where: query,
      skip,
      take: pageSize,
      relations: ['fundHouse', 'fundSchemeType'],
    });
  }

  async downloadAndSaveData(): Promise<void> {
    const url = 'https://www.amfiindia.com/spages/NAVAll.txt';
    const filePath = './NAVAll.txt';

    const request = this.httpService.get(url, {
      responseType: 'stream',
    });

    const response = await lastValueFrom(request);

    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    console.log('File downloaded and saved successfully!');

    await this.parseAndSaveData(filePath);
  }

  private async parseAndSaveData(filePath: string): Promise<void> {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let currentFundHouse: FundHouse | null = null;
    let currentFundSchemeType: FundSchemeType | null = null;

    const createFundDtoList: CreateFundDto[] = [];
    const createFundHistoryList: CreateFundHistoryDto[] = [];

    try {
      for await (const line of rl) {
        const trimmedLine = line.trim();

        if (trimmedLine.startsWith('Close Ended Schemes')) {
          break;
        }

        if (trimmedLine.endsWith('Mutual Fund')) {
          currentFundHouse = await this.fundHouseService.findOne({
            name: trimmedLine,
          });

          if (!currentFundHouse) {
            currentFundHouse = await this.fundHouseService.create({
              name: trimmedLine,
            });
          }
        } else if (trimmedLine.startsWith('Open Ended Schemes')) {
          const schemeTypeName =
            this.extractTextBetweenParentheses(trimmedLine) || trimmedLine;

          console.log('Adding Fund Scheme Type:', schemeTypeName);
          currentFundSchemeType = await this.fundSchemeTypeService.findOne({
            name: schemeTypeName,
          });

          if (!currentFundSchemeType) {
            currentFundSchemeType = await this.fundSchemeTypeService.create({
              name: schemeTypeName,
            });
          }
        } else if (currentFundHouse && !trimmedLine.startsWith('Scheme Code')) {
          const fields = trimmedLine.split(';');

          if (fields.length >= 6) {
            const netAssetValue = parseFloat(fields[4].trim());

            if (isNaN(netAssetValue)) {
              console.log(trimmedLine, 'is not a valid net asset value');
            }

            createFundDtoList.push({
              schemeCode: fields[0].trim(),
              schemeName: fields[3].trim(),
              netAssetValue: isNaN(netAssetValue) ? 0 : netAssetValue,
              date: fields[5].trim(),
              fundHouseId: currentFundHouse.id,
              fundSchemeTypeId: currentFundSchemeType.id,
            });

            createFundHistoryList.push({
              fundSchemeCode: fields[0].trim(),
              netAssetValue: isNaN(netAssetValue) ? 0 : netAssetValue,
              date: fields[5].trim(),
            });
          }
        }
      }

      await this.createBulk(createFundDtoList);
      await this.fundHistoryService.bulkCreate(createFundHistoryList);
    } catch (error) {
      console.error('Error parsing and saving data:', error);
    }
  }

  private extractTextBetweenParentheses(text: string): string | null {
    const regex = /\((.*?)\)/;
    const match = text.match(regex);
    return match && match[1].trim();
  }
}
