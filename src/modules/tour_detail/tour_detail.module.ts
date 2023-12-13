import { Module } from '@nestjs/common';
import { TourDetailService } from './tour_detail.service';
import { TourDetailController } from './tour_detail.controller';

@Module({
  controllers: [TourDetailController],
  providers: [TourDetailService],
})
export class TourDetailModule {}
