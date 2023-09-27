import {
  Body,
  Controller,
  Delete,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @Auth()
  async create(
    @CurrentUser('id') id: number,
    @Body() createCarDto: CreateCarDto,
  ) {
    return await this.carService.create(+id, createCarDto);
  }

  @Put(':id')
  @Auth()
  async updateCar(
    @Param('id') id: number,
    @Body() updateCarDto: UpdateUserDto,
    @CurrentUser('id') userId: number,
  ) {
    return await this.carService.updateCar(+id, updateCarDto, +userId);
  }

  @Delete(':id')
  @Auth()
  async deleteCar(@Param('id') id: number, @CurrentUser('id') userId: number) {
    return await this.carService.deleteCar(+id, +userId);
  }
}
