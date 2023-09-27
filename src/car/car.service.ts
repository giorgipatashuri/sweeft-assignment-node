import {
  Injectable,
  NotFoundException,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Injectable()
export class CarService {
  constructor(private prisma: PrismaService) {}

  async create(id: number, dto: CreateCarDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      return await this.prisma.car.create({
        data: { ...dto, user: { connect: { id } } },
      });
    } catch (error) {
      throw new BadRequestException('Failed to create car');
    }
  }

  async updateCar(id: number, dto: UpdateUserDto, userId: number) {
    const car = await this.prisma.car.findUnique({ where: { id } });
    if (!car) {
      throw new NotFoundException('Car not found');
    }
    if (car.userId !== userId) {
      throw new HttpException(
        'You do not have permission to delete this car',
        HttpStatus.FORBIDDEN,
      );
    }

    try {
      return await this.prisma.car.update({
        where: { id },
        data: { ...dto },
      });
    } catch (error) {
      throw new BadRequestException('Failed to update car');
    }
  }

  async deleteCar(id: number, userId: number) {
    const car = await this.prisma.car.findUnique({ where: { id } });

    if (!car) {
      throw new NotFoundException('Car not found');
    }
    if (car.userId !== userId) {
      throw new HttpException(
        'You do not have permission to delete this car',
        HttpStatus.FORBIDDEN,
      );
    }
    try {
      await this.prisma.car.delete({ where: { id } });
      return {
        message: 'car deleted',
      };
    } catch (error) {
      throw new BadRequestException('Failed to delete car');
    }
  }
}
