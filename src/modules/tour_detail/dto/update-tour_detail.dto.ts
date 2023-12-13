import { PartialType } from '@nestjs/mapped-types';
import { CreateTourDetailDto } from './create-tour_detail.dto';

export class UpdateTourDetailDto extends PartialType(CreateTourDetailDto) {}
