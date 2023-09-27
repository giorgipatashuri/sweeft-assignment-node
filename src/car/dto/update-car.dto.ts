import { IsEnum, IsOptional, IsString } from 'class-validator';

enum CarType {
  Sedan = 'sedan',
  Pickup = 'pickup',
  Jeep = 'jeep',
}
export class CreateCarDto {
  @IsString()
  @IsOptional()
  name: string;
  @IsString()
  @IsOptional()
  serialNumber: string;
  @IsEnum(CarType)
  @IsOptional()
  type: string;
}
