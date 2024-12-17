import { Controller, Get } from '@nestjs/common';
import { FundsService } from './funds.service';

@Controller('funds')
export class FundsController {
  constructor(private readonly fundsService: FundsService) {}

  @Get('fetch-funds-data')
  async fetchFundsData() {
    await this.fundsService.downloadAndSaveData();
    return { message: 'Funds data fetched and saved successfully' };
  }
}
