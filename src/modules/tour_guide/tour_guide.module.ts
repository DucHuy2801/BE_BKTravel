import { Module } from '@nestjs/common';
import { TourGuideService } from './tour_guide.service';
import { TourGuideController } from './tour_guide.controller';

@Module({
  providers: [TourGuideService],
  controllers: [TourGuideController]
})
export class TourGuideModule {}
