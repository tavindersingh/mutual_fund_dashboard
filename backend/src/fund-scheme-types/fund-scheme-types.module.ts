import { Module } from '@nestjs/common';
import { FundSchemeTypesService } from './fund-scheme-types.service';
import { FundSchemeTypesController } from './fund-scheme-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FundSchemeType } from './entities/fund-scheme-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FundSchemeType])],
  controllers: [FundSchemeTypesController],
  providers: [FundSchemeTypesService],
  exports: [FundSchemeTypesService],
})
export class FundSchemeTypesModule {}
