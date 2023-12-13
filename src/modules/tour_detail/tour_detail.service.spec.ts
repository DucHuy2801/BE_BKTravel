import { Test, TestingModule } from '@nestjs/testing';
import { TourDetailService } from './tour_detail.service';

describe('TourDetailService', () => {
  let service: TourDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TourDetailService],
    }).compile();

    service = module.get<TourDetailService>(TourDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
