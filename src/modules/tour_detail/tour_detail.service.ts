import { Injectable } from '@nestjs/common';
import { CreateTourDetailDto } from './dto/create-tour_detail.dto';
import { UpdateTourDetailDto } from './dto/update-tour_detail.dto';

@Injectable()
export class TourDetailService {
  create(createTourDetailDto: CreateTourDetailDto) {
    return 'This action adds a new tourDetail';
  }

  findAll() {
    return `This action returns all tourDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tourDetail`;
  }

  update(id: number, updateTourDetailDto: UpdateTourDetailDto) {
    return `This action updates a #${id} tourDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} tourDetail`;
  }
}
