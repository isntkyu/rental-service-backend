import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ReturnDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsInt()
  rentalId: number;
}
