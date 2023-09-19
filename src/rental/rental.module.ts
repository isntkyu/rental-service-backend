import { Module } from '@nestjs/common';
import { RentalService } from './rental.service';
import { RentalController } from './rental.controller';
import { rentalProviders } from './rental.provider';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from '../user/user.provider';
import { productProviders } from './product.provider';
import { businessCodeProviders } from '../user/business-code.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [RentalController],
  providers: [
    ...rentalProviders,
    ...userProviders,
    ...productProviders,
    ...businessCodeProviders,
    RentalService,
  ],
  exports: [RentalService],
})
export class RentalModule {}
