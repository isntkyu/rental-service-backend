import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.provider';
import { RentalModule } from '../rental/rental.module';

@Module({
  imports: [DatabaseModule, RentalModule],
  controllers: [UserController],
  providers: [...userProviders, UserService],
})
export class UserModule {}
