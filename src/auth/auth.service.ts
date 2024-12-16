import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { compareHashedPassword } from 'src/utils/helpers';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async signup(signupDto: SignupDto): Promise<User> {
    const user = await this.userService.create({
      ...signupDto,
    });

    return user;
  }

  async login(loginDto: LoginDto): Promise<User> {
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

    return user;
  }
}
