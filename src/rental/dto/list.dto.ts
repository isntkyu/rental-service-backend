import { Rental } from '../entities/rental.entity';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { PRODUCT_TYPE } from '../entities/product.entity';
import { format } from 'date-fns';

export enum ORDER {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class RentalListReqDto {
  @IsOptional()
  @IsDateString()
  rentalMonth?: string; // yyyy-MM

  @IsOptional()
  @IsString()
  @IsEnum(ORDER)
  order: ORDER = ORDER.DESC;
}

export class RentalListItem {
  email: string;
  rentalPeriod: string;
  productType: PRODUCT_TYPE;

  constructor(rental: Rental) {
    this.email = rental.rentalUserEmail;
    this.rentalPeriod =
      format(rental.rentalDate, 'yyyy.MM.dd') +
      ' ~ ' +
      format(rental.returnDate, 'yyyy.MM.dd');
    this.productType = rental.productType;
  }
}

export class RentalListResDto {
  rentalList: RentalListItem[];
  totalPrice: number;

  constructor(rentals: Rental[]) {
    this.rentalList = rentals.map((rental) => {
      return new RentalListItem(rental);
    });
    this.totalPrice = rentals.reduce((acc, rental) => acc + rental.price, 0);
  }
}
