import { Injectable } from '@nestjs/common';
import { CreatePersonelDto } from './dto/create-personel.dto';
import { UpdatePersonelDto } from './dto/update-personel.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PersonelService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createPersonelDto: CreatePersonelDto) {
    return this.prismaService.personel.create({
      data: createPersonelDto,
    });
  }

  findAll() {
    return this.prismaService.personel.findMany();
  }

  findOne(id: string) {
    return this.prismaService.personel.findUnique({ where: { id } });
  }

  update(id: string, updatePersonelDto: UpdatePersonelDto) {
    return this.prismaService.personel.update({
      where: { id },
      data: updatePersonelDto,
    });
  }

  remove(id: string) {
    return this.prismaService.personel.delete({ where: { id } });
  }
}
