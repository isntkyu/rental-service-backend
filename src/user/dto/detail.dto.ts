import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { User, UserType } from '../entities/user.entity';
import { RENTAL_STATUS } from '../../rental/entities/rental.entity';
import { UserWithRentalList } from '../user.service';
import { Type } from 'class-transformer';
import { format } from 'date-fns';
import { RentalListItem } from '../../rental/dto/list.dto';

export class UserDetailParam {
  @IsNotEmpty()
  @Type(() => Number)
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
  rentalInfo: {
    rentalId: number;
    serialNumber: string;
    businessCode: string;
    rentalDate: string;
    returnDate: string | null;
    price: number | null;
    status: RENTAL_STATUS;
  };

  constructor(user: User) {
    this.userId = user.userId;
    this.email = user.email;
    this.name = user.name;
    this.rentalInfo =
      user.rental == null || user.rental?.status === RENTAL_STATUS.PAID
        ? null
        : {
            status: user.rental.status,
            rentalId: user.rental.rentalId,
            serialNumber: user.rental.serialNumber,
            businessCode: user.rental.businessCode,
            rentalDate: format(user.rental.rentalDate, 'yyyy.MM.dd'),
            returnDate:
              user.rental.returnDate == null
                ? ''
                : format(user.rental.returnDate, 'yyyy.MM.dd'),
            price: user.rental.price,
          };
  }
}

export class BusinessUserDetailResDto {
  email: string;
  businessCode: string;
  name: string;
  rentalList: RentalListItem[];

  constructor(user: UserWithRentalList) {
    this.email = user.email;
    this.businessCode = user.businessCode.businessCode;
    this.name = user.name;
    this.rentalList = user.rentalList.map((rental) => {
      return new RentalListItem(rental);
    });
  }
}
