import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ParkingZoneService } from './parking-zone.service';
import { CreateParkingZoneDto } from './dto/create-parking-zone.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UpdateParkingZoneDto } from './dto/update-parking-zone.dto';

@Controller('parking-zone')
export class ParkingZoneController {
  constructor(private readonly parkingZoneService: ParkingZoneService) {}

  @Get()
  @Auth('admin')
  getAll() {
    return this.parkingZoneService.getAll();
  }
  @Post()
  @Auth('admin')
  createParingZone(@Body() dto: CreateParkingZoneDto) {
    return this.parkingZoneService.create(dto);
  }
  @Put(':id')
  @Auth('admin')
  updateParkingZone(
    @Param('id') id: number,
    @Body() dto: UpdateParkingZoneDto,
  ) {
    return this.parkingZoneService.updateParkingZone(+id, dto);
  }
  @Delete(':id')
  @Auth('admin')
  deleteParkingZone(@Param('id') id: number) {
    return this.parkingZoneService.deleteParkingZone(+id);
  }
}
