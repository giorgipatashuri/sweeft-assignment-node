import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateParkingZoneDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsNumber()
  @IsOptional()
  price: number;
}
