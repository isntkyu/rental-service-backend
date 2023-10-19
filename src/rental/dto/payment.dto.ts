import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class PaymentDto {
  @IsNotEmpty()
  @IsInt()
  rentalId: number;

  @IsNotEmpty()
  @IsString()
  depositer: string;
}

export class ApproveDto {
  @IsNotEmpty()
  @IsInt()
  rentalId: number;
}
