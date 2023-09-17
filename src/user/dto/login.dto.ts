import { User, UserType } from '../entities/user.entity';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class LoginReqDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(UserType)
  userType: UserType;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class LoginResDto {
  userType: UserType;

  userId: number;

  constructor(user: User) {
    this.userId = user.userId;
    this.userType = user.userType;
  }
}
