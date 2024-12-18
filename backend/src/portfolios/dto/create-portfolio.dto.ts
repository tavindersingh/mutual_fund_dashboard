import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePortfolioDto {
  @ApiProperty()
  schemeCode: string;

  @ApiProperty()
  units: number;

  @ApiPropertyOptional()
  purchaseDate?: Date;

  userId: number;
}
