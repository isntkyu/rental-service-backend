import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginReqDto, LoginResDto } from './dto/login.dto';
import { User, UserType } from './entities/user.entity';
import {
  BusinessUserDetailResDto,
  GeneralUserDetailResDto,
  UserDetailParam,
} from './dto/detail.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() loginReqDto: LoginReqDto) {
    const user: User = await this.userService.login(loginReqDto);

    return new LoginResDto(user);
  }

  @Get(':userType/:userId')
  async detail(@Param() userDetailParam: UserDetailParam) {
    switch (userDetailParam.userType) {
      case UserType.BUSINESS:
        const userWithRentalList = await this.userService.getUserWithRentalList(
          userDetailParam.userId,
        );

        return new BusinessUserDetailResDto(userWithRentalList);
      case UserType.ADMIN:
        return await this.userService.getUser(userDetailParam.userId);
      case UserType.GENERAL:
        const userWithRental: User =
          await this.userService.getUserWithRentalInfo(userDetailParam.userId);

        return new GeneralUserDetailResDto(userWithRental);
      default:
        throw new BadRequestException();
    }
  }
}
