import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginReqDto, LoginResDto } from './dto/login.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() loginReqDto: LoginReqDto) {
    const user: User = await this.userService.login(loginReqDto);

    return new LoginResDto(user);
  }
}
