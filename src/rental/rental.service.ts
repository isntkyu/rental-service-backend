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
  HOUSING_REG_INFO_REPOSITORY,
  RENTAL_REPOSITORY,
  USER_REPOSITORY,
} from '../constants';
import { CreateRentalDto } from './dto/create.dto';
import { BusinessCode } from '../user/entities/business-code.entity';
import { User } from '../user/entities/user.entity';
import { ReturnDto } from './dto/return.dto';
import { PaymentDto } from './dto/payment.dto';
import { HousingRegInfo } from './entities/housing-reg-info.entity';

@Injectable()
export class RentalService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: Repository<User>,
    @Inject(RENTAL_REPOSITORY)
    private readonly rentalRepository: Repository<Rental>,
    @Inject(BUSINESS_CODE_REPOSITORY)
    private readonly businessCodeRepository: Repository<BusinessCode>,
    @Inject(HOUSING_REG_INFO_REPOSITORY)
    private readonly housingRegInfoRepository: Repository<HousingRegInfo>,
  ) {}

  async approve(rentalId) {
    await this.rentalRepository.update(
      {
        rentalId,
      },
      {
        status: RENTAL_STATUS.RETURNED,
      },
    );
  }

  async finish(rentalId) {
    await this.rentalRepository.update(
      {
        rentalId,
      },
      {
        status: RENTAL_STATUS.FINISH,
      },
    );
  }

  async createRental(createRentalDto: CreateRentalDto) {
    const { rentalUserId, businessCode, serialNumber, productType } =
      createRentalDto;

    const rentalData = await this.rentalRepository.findOne({
      where: {
        rentalUserId,
        status: RENTAL_STATUS.RENTAL,
      },
    });
    if (rentalData != null) {
      throw new BadRequestException('중복 렌탈할 수 없습니다.');
    }

    const regInfo = await this.housingRegInfoRepository.findOne({
      where: {
        serialNumber,
        status: 'REGISTERED',
      },
    });

    if (regInfo == null) {
      throw new BadRequestException('등록되지 않은 시리얼번호 입니다.');
    }
    const user = await this.userRepository.findOne({
      where: { userId: rentalUserId },
    });

    if (user == null) {
      throw new NotFoundException('user');
    }

    const businessCodeEntity = await this.businessCodeRepository.findOne({
      where: { businessCode },
      relations: {
        user: true,
      },
    });

    if (businessCodeEntity == null) {
      throw new NotFoundException('businessCode');
    }

    const rental = new Rental();
    rental.rentalDate = new Date();
    rental.returnDate = null;
    rental.businessCode = businessCodeEntity.businessCode;
    rental.businessName = businessCodeEntity.user.name;
    rental.serialNumber = serialNumber;
    rental.productType = '유니버셜 프로 & 미니';
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

    const regInfo = await this.housingRegInfoRepository.findOne({
      where: {
        serialNumber: rental.serialNumber,
        status: 'NONE',
      },
    });

    if (regInfo == null) {
      throw new BadRequestException('해지를 먼저 진행해주세요.');
    }

    await this.rentalRepository.update(
      {
        rentalId,
      },
      {
        returnDate: new Date(),
        price: 200,
        status: RENTAL_STATUS.RETURN_REQUEST,
      },
    );
  }

  async pay(paymentDto: PaymentDto) {
    const { rentalId, depositer } = paymentDto;

    const rental = await this.rentalRepository.findOne({
      where: { rentalId, status: RENTAL_STATUS.RETURN_REQUEST },
    });

    if (rental == null) {
      throw new BadRequestException();
    }

    await this.rentalRepository.update(
      {
        rentalId,
      },
      {
        depositer: depositer,
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

  async getRentals(rentalListReqDto: RentalListReqDto) {
    const { rentalMonth, order, searchBusinessName } = rentalListReqDto;

    const qb = this.rentalRepository
      .createQueryBuilder('r')
      .orderBy('r.rentalId', order === ORDER.ASC ? 'ASC' : 'DESC');

    if (rentalMonth != null) {
      qb.andWhere("DATE_FORMAT(r.rentalDate, '%Y-%m') = :rentalMonth", {
        rentalMonth,
      });
    }

    if (searchBusinessName != null && searchBusinessName != '') {
      qb.andWhere(`r.businessName like '%${searchBusinessName}%'`);
    }

    const rentals: Rental[] = await qb.getMany();

    return rentals;
  }
}
