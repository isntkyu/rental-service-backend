import { PRODUCT_TYPE } from '../entities/product.entity';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRentalDto {
  @IsNotEmpty()
  @IsString()
  serialNumber: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(PRODUCT_TYPE)
  productType: PRODUCT_TYPE;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  rentalUserId: number;

  @IsNotEmpty()
  @IsString()
  businessCode: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
