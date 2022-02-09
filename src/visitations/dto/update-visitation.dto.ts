import { PartialType } from '@nestjs/mapped-types';
import { CreateVisitationDto } from './create-visitation.dto';

export class UpdateVisitationDto extends PartialType(CreateVisitationDto) {}
