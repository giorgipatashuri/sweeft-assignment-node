import { IsEnum, IsString } from 'class-validator';

enum CarType {
  Sedan = 'sedan',
  Pickup = 'pickup',
  Jeep = 'jeep',
}
export class CreateCarDto {
  @IsString()
  name: string;
  @IsString()
  serialNumber: string;
  @IsEnum(CarType)
  type: string;
}
