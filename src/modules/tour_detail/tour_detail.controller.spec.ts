import { Test, TestingModule } from '@nestjs/testing';
import { TourDetailController } from './tour_detail.controller';
import { TourDetailService } from './tour_detail.service';

describe('TourDetailController', () => {
  let controller: TourDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TourDetailController],
      providers: [TourDetailService],
    }).compile();

    controller = module.get<TourDetailController>(TourDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
