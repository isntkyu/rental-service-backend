import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { User, UserType } from '../entities/user.entity';
import { Rental } from '../../rental/entities/rental.entity';
import { UserWithRentalList } from '../user.service';

export class UserDetailParam {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsEnum(UserType)
  userType: UserType;
}

export class GeneralUserDetailResDto {
  userId: number;
  email: string;
  name: string;
  rentalInfo: Rental;

  constructor(user: User) {
    this.userId = user.userId;
    this.email = user.email;
    this.name = user.name;
    this.rentalInfo = user.rental ?? null;
  }
}

export class BusinessUserDetailResDto {
  email: string;
  businessCode: string;
  name: string;
  rentalList: Rental[];

  constructor(user: UserWithRentalList) {
    this.email = user.email;
    this.businessCode = user.businessCode.businessCode;
    this.name = user.name;
    this.rentalList = user.rentalList;
  }
}
