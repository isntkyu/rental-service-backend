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
      user.rentals[0] == null || user.rentals[0]?.status === RENTAL_STATUS.PAID
        ? null
        : {
            status: user.rentals[0].status,
            rentalId: user.rentals[0].rentalId,
            serialNumber: user.rentals[0].serialNumber,
            businessCode: user.rentals[0].businessCode,
            rentalDate: format(user.rentals[0].rentalDate, 'yyyy.MM.dd'),
            returnDate:
              user.rentals[0].returnDate == null
                ? ''
                : format(user.rentals[0].returnDate, 'yyyy.MM.dd'),
            price: user.rentals[0].price,
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
