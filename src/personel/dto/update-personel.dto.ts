import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonelDto } from './create-personel.dto';

export class UpdatePersonelDto extends PartialType(CreatePersonelDto) {}
