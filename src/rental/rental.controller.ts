import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RentalService } from './rental.service';
import { RentalListReqDto, RentalListResDto } from './dto/list.dto';
import { Rental } from './entities/rental.entity';
import { CreateRentalDto } from './dto/create.dto';
import { ReturnDto } from './dto/return.dto';
import { ApproveDto, PaymentDto } from './dto/payment.dto';
import { SettlementDto } from './dto/settlement.dto';

@Controller('rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Post('/return/approve')
  async approve(@Body() approveDto: ApproveDto) {
    await this.rentalService.approve(approveDto.rentalId);
    return {
      success: true,
    };
  }

  @Post('finish')
  async finish(@Body() approveDto: ApproveDto) {
    await this.rentalService.finish(approveDto.rentalId);
    return {
      success: true,
    };
  }

  @Get('list')
  async list(@Query() rentalListReqDto: RentalListReqDto) {
    const rentals: Rental[] = await this.rentalService.getRentals(
      rentalListReqDto,
    );

    return new RentalListResDto(rentals);
  }

  @Post('')
  async create(@Body() createRentalDto: CreateRentalDto) {
    return await this.rentalService.createRental(createRentalDto);
  }

  @Post('return')
  async return(@Body() returnDto: ReturnDto) {
    await this.rentalService.return(returnDto);

    return {
      success: true,
    };
  }

  @Post('payment')
  async pay(@Body() paymentDto: PaymentDto) {
    await this.rentalService.pay(paymentDto);

    return {
      success: true,
    };
  }

  @Post('settlement')
  async settlement(@Body() settlementDto: SettlementDto) {
    await this.rentalService.settlement(settlementDto.rentalIds);
  }
}
