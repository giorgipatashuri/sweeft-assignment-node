import { IsNumber, IsString } from 'class-validator';

export class CreateParkingZoneDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsNumber()
  price: number;
}
