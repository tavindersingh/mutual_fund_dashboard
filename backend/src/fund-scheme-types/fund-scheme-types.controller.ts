import { Controller } from '@nestjs/common';
import { FundSchemeTypesService } from './fund-scheme-types.service';

@Controller('fund-scheme-types')
export class FundSchemeTypesController {
  constructor(private readonly fundSchemeTypesService: FundSchemeTypesService) {}
}
