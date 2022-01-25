import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PersonelService } from './personel.service';
import { CreatePersonelDto } from './dto/create-personel.dto';
import { UpdatePersonelDto } from './dto/update-personel.dto';

@Controller('personel')
export class PersonelController {
  constructor(private readonly personelService: PersonelService) {}

  @Post()
  async create(@Body() createPersonelDto: CreatePersonelDto) {
    return await this.personelService.create(createPersonelDto);
  }

  @Get()
  findAll() {
    return this.personelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personelService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePersonelDto: UpdatePersonelDto,
  ) {
    return this.personelService.update(id, updatePersonelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personelService.remove(id);
  }
}
