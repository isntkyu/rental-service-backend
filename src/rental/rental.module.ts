import { Module } from '@nestjs/common';
import { RentalService } from './rental.service';
import { RentalController } from './rental.controller';
import { rentalProviders } from './rental.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RentalController],
  providers: [...rentalProviders, RentalService],
  exports: [RentalService],
})
export class RentalModule {}
