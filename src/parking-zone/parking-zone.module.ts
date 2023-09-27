import { Module } from '@nestjs/common';
import { ParkingZoneService } from './parking-zone.service';
import { ParkingZoneController } from './parking-zone.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ParkingZoneController],
  providers: [ParkingZoneService, PrismaService],
})
export class ParkingZoneModule {}
