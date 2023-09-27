import { Test, TestingModule } from '@nestjs/testing';
import { ParkingZoneController } from './parking-zone.controller';
import { ParkingZoneService } from './parking-zone.service';

describe('ParkingZoneController', () => {
  let controller: ParkingZoneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingZoneController],
      providers: [ParkingZoneService],
    }).compile();

    controller = module.get<ParkingZoneController>(ParkingZoneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
