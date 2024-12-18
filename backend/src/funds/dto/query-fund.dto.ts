import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryFundDto {
  @ApiPropertyOptional({
    description: 'Fund House Name',
  })
  fundHouse: string;

  @ApiPropertyOptional({
    description: 'Fund Scheme Type Name',
  })
  fundSchemeType: string;

  @ApiPropertyOptional()
  pageSize: number;

  @ApiPropertyOptional()
  page: number;
}
