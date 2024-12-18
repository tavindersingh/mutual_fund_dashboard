import { Controller } from '@nestjs/common';
import { FundHousesService } from './fund-houses.service';

@Controller('fund-houses')
export class FundHousesController {
  constructor(private readonly fundHousesService: FundHousesService) {}
}
