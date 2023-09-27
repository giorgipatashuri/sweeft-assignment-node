import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateParkingZoneDto } from './dto/create-parking-zone.dto';
import { UpdateParkingZoneDto } from './dto/update-parking-zone.dto';

@Injectable()
export class ParkingZoneService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.parkingZone.findMany({
      include: { ParkingHistory: true },
    });
  }

  async create(dto: CreateParkingZoneDto) {
    try {
      const parkingZone = await this.prisma.parkingZone.create({
        data: { ...dto },
      });
      return parkingZone;
    } catch (error) {
      throw new BadRequestException('Failed to create parking zone');
    }
  }

  async deleteParkingZone(id: number) {
    const parkingZone = await this.prisma.parkingZone.findUnique({
      where: { id },
    });
    if (!parkingZone) {
      throw new NotFoundException('Parking zone not found');
    }

    try {
      await this.prisma.parkingZone.delete({ where: { id } });
      return {
        message: 'parking zone deleted',
      };
    } catch (error) {
      throw new BadRequestException('Failed to delete parking zone');
    }
  }

  async updateParkingZone(id: number, dto: UpdateParkingZoneDto) {
    const parkingZone = await this.prisma.parkingZone.findUnique({
      where: { id },
    });

    if (!parkingZone) {
      throw new NotFoundException('Parking zone not found');
    }

    try {
      return await this.prisma.parkingZone.update({
        where: { id },
        data: { ...dto },
      });
    } catch (error) {
      throw new BadRequestException('Failed to update parking zone');
    }
  }
}
