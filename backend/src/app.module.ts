import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FundsModule } from './funds/funds.module';
import { FundHousesModule } from './fund-houses/fund-houses.module';
import { FundSchemeTypesModule } from './fund-scheme-types/fund-scheme-types.module';
import { FundHistoryModule } from './fund-history/fund-history.module';
import { PortfoliosModule } from './portfolios/portfolios.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    AuthModule,
    FundsModule,
    FundHousesModule,
    FundSchemeTypesModule,
    FundHistoryModule,
    PortfoliosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
