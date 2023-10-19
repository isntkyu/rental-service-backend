import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateRentalDto {
  @IsNotEmpty()
  @IsString()
  serialNumber: string;

  @IsNotEmpty()
  @IsString()
  productType: string;

  @IsNotEmpty()
  @IsInt()
  rentalUserId: number;

  @IsNotEmpty()
  @IsString()
  businessCode: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
