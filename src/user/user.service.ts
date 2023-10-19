import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { USER_REPOSITORY } from '../constants';
import { Repository } from 'typeorm';
import { User, UserType } from './entities/user.entity';
import { LoginReqDto } from './dto/login.dto';
import { RentalService } from '../rental/rental.service';
import { Rental } from '../rental/entities/rental.entity';
import { ORDER } from '../rental/dto/list.dto';
import { BusinessCode } from './entities/business-code.entity';

export interface BusinessUser extends User {
  businessCode: BusinessCode;
}

export interface UserWithRentalList extends User {
  businessCode: BusinessCode;
  rentalList: Rental[];
}

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: Repository<User>,
    private readonly rentalService: RentalService,
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

  async getUser(userId: number) {
    return await this.userRepository.findOne({
      where: { userId },
    });
  }

  async getUserWithRentalInfo(userId: number) {
    const user = await this.userRepository.findOne({
      where: { userId },
      relations: {
        rentals: true,
      },
    });

    if (user == null) {
      throw new NotFoundException();
    }

    return user;
  }

  async getUserWithRentalList(userId: number): Promise<UserWithRentalList> {
    const user = await this.userRepository.findOne({
      where: { userId },
      relations: {
        businessCode: true,
      },
    });

    if (user == null || user.userType !== UserType.BUSINESS) {
      throw new NotFoundException();
    }

    const rentalList = await this.rentalService.getRentals({
      rentalMonth: null,
      order: ORDER.DESC,
    });

    return {
      ...(user as BusinessUser),
      rentalList,
    };
  }
}
