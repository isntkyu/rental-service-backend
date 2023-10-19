import { Rental, RENTAL_STATUS } from '../entities/rental.entity';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
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

  @IsOptional()
  @IsString()
  searchBusinessName?: string;
}

export class RentalListItem {
  email: string;
  rentalPeriod: string;
  productType: string;
  rentalId: number;
  status: string;
  businessCode: string | null;
  businessName: string | null;
  depositer: string | null;

  constructor(rental: Rental) {
    this.rentalId = rental.rentalId;
    this.email = rental.rentalUserEmail;
    this.rentalPeriod =
      format(rental.rentalDate, 'yyyy.MM.dd') +
      ' ~ ' +
      (rental.returnDate != null
        ? format(rental.returnDate, 'yyyy.MM.dd')
        : '');
    this.productType = rental.productType;
    this.depositer = rental.depositer;
    this.businessCode = rental.businessCode;
    this.businessName = rental.businessName;
    this.status = ((status) => {
      switch (status) {
        case RENTAL_STATUS.RENTAL:
          return '렌털중';
        case RENTAL_STATUS.FINISH:
          return '반납완료';
      }
    })(rental.status);
  }
}

export class RentalListResDto {
  rentalList: RentalListItem[];
  totalPrice: number;

  constructor(rentals: Rental[]) {
    this.rentalList = rentals
      .map((rental) => {
        return new RentalListItem(rental);
      })
      .filter((item) => item.status === '렌털중' || item.status === '반납완료');
    this.totalPrice = rentals.reduce((acc, rental) => acc + rental.price, 0);
  }
}
