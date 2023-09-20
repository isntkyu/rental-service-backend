import { IsInt, IsNotEmpty } from 'class-validator';

export class PaymentDto {
  @IsNotEmpty()
  @IsInt()
  rentalId: number;
}
