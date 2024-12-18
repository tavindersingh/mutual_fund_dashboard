import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    const user = await this.authService.signup(signupDto);

    if (!user) {
      throw new InternalServerErrorException('Something went wrong');
    }

    return {
      success: true,
      message: 'User created successfully',
    };
  }

  @Post('login')
  async login(@Body() loginDto: SignupDto) {
    const tokens = await this.authService.login(loginDto);

    return {
      success: true,
      message: 'User logged in successfully',
      tokens,
    };
  }
}
