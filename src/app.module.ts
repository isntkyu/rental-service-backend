import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { RentalModule } from './rental/rental.module';

@Module({
  imports: [DatabaseModule, UserModule, RentalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
