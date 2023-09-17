import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { RentalModule } from './rental/rental.module';
import { PaymentModule } from './payment/payment.module';
import { SettlementModule } from './settlement/settlement.module';

@Module({
  imports: [DatabaseModule, UserModule, RentalModule, PaymentModule, SettlementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
