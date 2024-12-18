import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { compareHashedPassword } from 'src/utils/helpers';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { JwtPayload, Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(signupDto: SignupDto): Promise<User> {
    const user = await this.userService.create({
      ...signupDto,
    });

    return user;
  }

  async login(loginDto: LoginDto): Promise<Tokens> {
    const user = await this.userService.findOne({
      email: loginDto.email,
    });

    if (!user) {
      throw new BadRequestException('Email not found');
    }

    const isPasswordValid = await compareHashedPassword(
      loginDto.password,
      user.hashedPassword,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password');
    }

    return await this.getJwtTokens({
      sub: user.id,
    });
  }

  async getJwtTokens(jwtPayload: JwtPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '1d',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '1y',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
