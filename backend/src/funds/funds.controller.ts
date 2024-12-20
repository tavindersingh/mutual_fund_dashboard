import { Controller, Get, Query } from '@nestjs/common';
import { FundsService } from './funds.service';
import { ApiQuery } from '@nestjs/swagger';
import { QueryFundDto } from './dto/query-fund.dto';

@Controller('funds')
export class FundsController {
  constructor(private readonly fundsService: FundsService) {}

  @Get('fetch-funds-data')
  async fetchFundsData() {
    await this.fundsService.downloadAndSaveData();
    return { message: 'Funds data fetched and saved successfully' };
  }

  @Get()
  @ApiQuery({ name: 'fundHouse', required: false })
  @ApiQuery({ name: 'fundSchemeType', required: false })
  @ApiQuery({ name: 'pageSize', required: false, default: 10 })
  @ApiQuery({ name: 'page', required: false, default: 1 })
  async findAll(@Query() queryFundDto: QueryFundDto) {
    const funds = await this.fundsService.findAll(queryFundDto);

    return {
      success: true,
      funds,
      meta: {
        page: queryFundDto.page || 1,
        pageSize: queryFundDto.pageSize || 10,
      },
    };
  }
}
