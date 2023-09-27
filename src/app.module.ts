import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CarModule } from './car/car.module';
import { ParkingZoneModule } from './parking-zone/parking-zone.module';
import { ParkingModule } from './parking/parking.module';

@Module({
  imports: [UserModule, AuthModule, CarModule, ParkingZoneModule, ParkingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
