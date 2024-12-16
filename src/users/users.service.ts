import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/utils/helpers';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findOne({ email: createUserDto.email });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await hashPassword(createUserDto.password);

    const user = this.userRepository.create({
      email: createUserDto.email,
      hashedPassword: hashedPassword,
    });

    return await this.userRepository.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(queryUserDto: Partial<QueryUserDto>): Promise<User | null> {
    const query: FindOptionsWhere<User> = {};

    if (queryUserDto.id) {
      query.id = queryUserDto.id;
    }
    if (queryUserDto.email) {
      query.email = queryUserDto.email;
    }

    return await this.userRepository.findOneBy(query);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
