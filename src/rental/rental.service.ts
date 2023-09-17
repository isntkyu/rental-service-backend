import { Inject, Injectable } from '@nestjs/common';
import { RentalListReqDto } from './dto/list.dto';
import { Rental, RENTAL_STATUS } from './entities/rental.entity';
import { Repository } from 'typeorm';
import { RENTAL_REPOSITORY } from '../constants';

@Injectable()
export class RentalService {
  constructor(
    @Inject(RENTAL_REPOSITORY)
    private readonly rentalRepository: Repository<Rental>,
  ) {}

  async getRentals(rentalListReqDto: RentalListReqDto, status: RENTAL_STATUS) {
    const { rentalMonth, order } = rentalListReqDto;

    const qb = this.rentalRepository
      .createQueryBuilder('r')
      .where('r.status = :status', { status })
      .orderBy('r.rentalId', order);

    if (rentalMonth != null) {
      qb.andWhere("DATE_FORMAT(r.rentalDate, '%Y-%m') = :rentalMonth", {
        rentalMonth,
      });
    }

    const rentals: Rental[] = await qb.getMany();

    return rentals;
  }
}
