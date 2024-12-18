import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { PortfoliosService } from './portfolios.service';
import { Request } from 'express';

@Controller('portfolios')
export class PortfoliosController {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  @Post('add')
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  async create(
    @Req() req: Request,
    @Body() createPortfolioDto: CreatePortfolioDto,
  ) {
    console.log(req.user);
    createPortfolioDto.userId = req.user['id'];

    const portfolioItem =
      await this.portfoliosService.create(createPortfolioDto);

    return {
      success: true,
      portfolioItem,
    };
  }

  @Get('user')
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  async getUserPortfolioData(@Req() req: Request) {
    const userId = req.user['id'];
    const portfolio = await this.portfoliosService.getUserPortfolioData({
      userId,
    });

    return {
      success: true,
      portfolio,
    };
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
  ) {
    return this.portfoliosService.update(+id, updatePortfolioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.portfoliosService.remove(+id);
  }
}
