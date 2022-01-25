import { Injectable } from '@nestjs/common';
import { CreatePersonelDto } from './dto/create-personel.dto';
import { UpdatePersonelDto } from './dto/update-personel.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PersonelService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPersonelDto: CreatePersonelDto) {
    const password = await bcrypt.hash(createPersonelDto.password, 10);
    const parsedUser = { ...createPersonelDto, password };

    return this.prismaService.personel.create({
      data: parsedUser,
    });
  }

  findAll() {
    return this.prismaService.personel.findMany();
  }

  findOne(id: string) {
    return this.prismaService.personel.findUnique({ where: { id } });
  }

  findOneByEmail(email: string) {
    return this.prismaService.personel.findUnique({ where: { email } });
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
