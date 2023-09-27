import { Module } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { ParkingController } from './parking.controller';
import { PrismaService } from 'src/prisma.service';
import { SchedulerRegistry } from '@nestjs/schedule';

@Module({
  controllers: [ParkingController],

  providers: [ParkingService, PrismaService, SchedulerRegistry],
})
export class ParkingModule {}
