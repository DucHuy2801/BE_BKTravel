import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TourDetailService } from './tour_detail.service';
import { CreateTourDetailDto } from './dto/create-tour_detail.dto';
import { UpdateTourDetailDto } from './dto/update-tour_detail.dto';

@Controller('tour-detail')
export class TourDetailController {
  constructor(private readonly tourDetailService: TourDetailService) {}

  @Post()
  create(@Body() createTourDetailDto: CreateTourDetailDto) {
    return this.tourDetailService.create(createTourDetailDto);
  }

  @Get()
  findAll() {
    return this.tourDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tourDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTourDetailDto: UpdateTourDetailDto) {
    return this.tourDetailService.update(+id, updateTourDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tourDetailService.remove(+id);
  }
}
