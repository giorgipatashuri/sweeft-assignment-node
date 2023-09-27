import { Test, TestingModule } from '@nestjs/testing';
import { ParkingZoneService } from './parking-zone.service';

describe('ParkingZoneService', () => {
  let service: ParkingZoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingZoneService],
    }).compile();

    service = module.get<ParkingZoneService>(ParkingZoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
