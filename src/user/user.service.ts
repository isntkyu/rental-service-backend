import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_REPOSITORY } from '../constants';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginReqDto } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: Repository<User>,
  ) {}

  async login(loginReqDto: LoginReqDto) {
    const user = await this.userRepository.findOne({
      where: loginReqDto,
    });

    if (user == null) {
      throw new UnauthorizedException('로그인 실패');
    }

    return user;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
