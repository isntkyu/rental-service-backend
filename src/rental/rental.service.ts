import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ORDER, RentalListReqDto } from './dto/list.dto';
import { Rental, RENTAL_STATUS } from './entities/rental.entity';
import { Repository } from 'typeorm';
import {
  BUSINESS_CODE_REPOSITORY,
  PRODUCT_REPOSITORY,
  RENTAL_REPOSITORY,
  USER_REPOSITORY,
} from '../constants';
import { CreateRentalDto } from './dto/create.dto';
import { BusinessCode } from '../user/entities/business-code.entity';
import { Product } from './entities/product.entity';
import { User } from '../user/entities/user.entity';
import { ReturnDto } from './dto/return.dto';
import { PaymentDto } from './dto/payment.dto';

@Injectable()
export class RentalService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: Repository<User>,
    @Inject(RENTAL_REPOSITORY)
    private readonly rentalRepository: Repository<Rental>,
    @Inject(BUSINESS_CODE_REPOSITORY)
    private readonly businessCodeRepository: Repository<BusinessCode>,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createRental(createRentalDto: CreateRentalDto) {
    const { rentalUserId, businessCode, serialNumber, productType } =
      createRentalDto;

    const user = await this.userRepository.findOne({
      where: { userId: rentalUserId },
    });

    if (user == null) {
      throw new NotFoundException('user');
    }

    const businessCodeEntity = await this.businessCodeRepository.findOne({
      where: { businessCode },
    });

    if (businessCodeEntity == null) {
      throw new NotFoundException('businessCode');
    }

    const product = await this.productRepository.findOne({
      where: { serialNumber, productType },
    });

    if (product == null) {
      throw new NotFoundException('product');
    }

    const rental = new Rental();
    rental.rentalDate = new Date();
    rental.returnDate = null;
    rental.serialNumber = product.serialNumber;
    rental.productType = product.productType;
    rental.rentalUserId = user.userId;
    rental.rentalUserEmail = user.email;
    rental.businessUserId = businessCodeEntity.userId;
    rental.businessCode = businessCodeEntity.businessCode;
    rental.price = null;
    rental.status = RENTAL_STATUS.RENTAL;

    return await this.rentalRepository.save(rental);
  }

  async return(returnDto: ReturnDto) {
    const { rentalId } = returnDto;

    const rental = await this.rentalRepository.findOne({
      where: { rentalId },
    });

    if (rental == null) {
      throw new BadRequestException();
    }

    await this.rentalRepository.update(
      {
        rentalId,
      },
      {
        returnDate: new Date(),
        price: 200,
        status: RENTAL_STATUS.RETURNED,
      },
    );
  }

  async pay(paymentDto: PaymentDto) {
    const { rentalId } = paymentDto;

    const rental = await this.rentalRepository.findOne({
      where: { rentalId, status: RENTAL_STATUS.RETURNED },
    });

    if (rental == null) {
      throw new BadRequestException();
    }

    await this.rentalRepository.update(
      {
        rentalId,
      },
      {
        status: RENTAL_STATUS.PAID,
      },
    );
  }

  async settlement(ids: number[]) {
    for (const id of ids) {
      await this.rentalRepository.update(
        {
          rentalId: id,
        },
        {
          status: RENTAL_STATUS.SETTLED,
        },
      );
    }
  }

  async getRentals(rentalListReqDto: RentalListReqDto, status: RENTAL_STATUS) {
    const { rentalMonth, order } = rentalListReqDto;

    const qb = this.rentalRepository
      .createQueryBuilder('r')
      .where('r.status = :status', { status })
      .orderBy('r.rentalId', order === ORDER.ASC ? 'ASC' : 'DESC');

    if (rentalMonth != null) {
      qb.andWhere("DATE_FORMAT(r.rentalDate, '%Y-%m') = :rentalMonth", {
        rentalMonth,
      });
    }

    const rentals: Rental[] = await qb.getMany();

    return rentals;
  }
}
