import { Controller, Get, Query } from '@nestjs/common';
import { RentalService } from './rental.service';
import { RentalListReqDto, RentalListResDto } from './dto/list.dto';
import { Rental, RENTAL_STATUS } from './entities/rental.entity';

@Controller('rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Get('list')
  async list(@Query() rentalListReqDto: RentalListReqDto) {
    const rentals: Rental[] = await this.rentalService.getRentals(
      rentalListReqDto,
      RENTAL_STATUS.PAID,
    );

    return new RentalListResDto(rentals);
  }
}
