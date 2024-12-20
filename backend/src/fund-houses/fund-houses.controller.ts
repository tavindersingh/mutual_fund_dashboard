import { Controller, Get } from '@nestjs/common';
import { FundHousesService } from './fund-houses.service';

@Controller('fund-houses')
export class FundHousesController {
  constructor(private readonly fundHousesService: FundHousesService) {}

  @Get()
  async findAll() {
    const fundHousesList = await this.fundHousesService.findAll();

    return {
      success: true,
      fundHousesList,
    };
  }
}
