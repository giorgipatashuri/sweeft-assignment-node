import {
  Injectable,
  Logger,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ParkingService {
  constructor(
    private prisma: PrismaService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async parkCar(userId: number, carId: number, zoneId: number) {
    const [user, car, parkingZone] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: userId } }),
      this.prisma.car.findUnique({ where: { id: carId } }),
      this.prisma.parkingZone.findUnique({ where: { id: zoneId } }),
    ]);
    if (!user || !car || !parkingZone) {
      throw new NotFoundException('User, car, or parking zone not found');
    }
    if (user.balance < parkingZone.price)
      throw new BadRequestException("User don't have enough balance");
    const cronJobName = this.generateCronJobName(carId);
    try {
      const parking = await this.prisma.parkingHistory.create({
        data: {
          user: { connect: { id: userId } },
          car: { connect: { id: carId } },
          parking: { connect: { id: zoneId } },
          isActive: true,
        },
        include: {
          parking: true,
        },
      });

      await this.prisma.cronJob.create({
        data: {
          car: { connect: { id: carId } },
          name: cronJobName,
        },
      });

      const cronJob = new CronJob('*/60 * * * * *', () =>
        this.handleCron(userId, parking.parking.price, cronJobName),
      );
      this.schedulerRegistry.addCronJob(cronJobName, cronJob);
      cronJob.start();
      return {
        parkingId: parking.id,
        cronName: cronJobName,
      };
    } catch (error) {
      this.schedulerRegistry.deleteCronJob(cronJobName);
      throw error;
    }
  }
  async cancelParking(id: number) {
    if (id) {
      throw new BadRequestException('Missing required parameters');
    }
    const parkingHistory = await this.prisma.parkingHistory.findFirst({
      where: {
        id,
      },
    });

    if (!parkingHistory) {
      throw new BadRequestException('Parking history not found.');
    }
    const updatedParkingHistory = await this.prisma.parkingHistory.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
      include: {
        user: true,
        parking: true,
        car: true,
      },
    });
    try {
      const cron = await this.prisma.cronJob.findFirst({
        where: { carId: updatedParkingHistory.carId },
      });
      this.schedulerRegistry.deleteCronJob(cron.name);
      await this.prisma.cronJob.delete({
        where: { carId: updatedParkingHistory.carId },
      });
    } catch (error) {}
  }
  private async handleCron(
    userId: number,
    parkingPrice: number,
    cronJobName: string,
  ) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user) throw new NotFoundException('User not found');
      if (user.balance < parkingPrice)
        throw new BadRequestException("User don't have enough balance");
      let balance = user.balance - parkingPrice;
      let updatedUser = await this.prisma.user.update({
        where: { id: user.id },
        data: { balance },
      });
      console.log(updatedUser);
    } catch (error) {
      this.schedulerRegistry.deleteCronJob(cronJobName);
    }
  }

  private generateCronJobName(carId: number): string {
    return `user_${carId}_cron`;
  }
}
