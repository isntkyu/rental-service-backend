import { IsNotEmpty } from 'class-validator';

export class SettlementDto {
  @IsNotEmpty()
  rentalIds: number[];
}
