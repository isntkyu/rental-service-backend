import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RentalService } from './rental.service';
import { RentalListReqDto, RentalListResDto } from './dto/list.dto';
import { Rental, RENTAL_STATUS } from './entities/rental.entity';
import { CreateRentalDto } from './dto/create.dto';

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

  @Post('')
  async create(@Body() createRentalDto: CreateRentalDto) {
    return await this.rentalService.createRental(createRentalDto);
  }
}
