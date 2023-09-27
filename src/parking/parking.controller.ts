import { Controller, Post, Query } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';

@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Post()
  @Auth()
  parkingCar(@CurrentUser('id') id: number, @Query() queryDto: any) {
    return this.parkingService.parkCar(+id, +queryDto.carId, +queryDto.zoneId);
  }

  @Post('cancel')
  cancelParking() {
    return this.parkingService.cancelParking(1);
  }
}
