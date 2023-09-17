import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginReqDto, LoginResDto } from './dto/login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async create(@Body() loginReqDto: LoginReqDto) {
    const user = await this.userService.login(loginReqDto);

    return new LoginResDto(user);
  }
}
