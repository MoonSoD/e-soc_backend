import { Module } from '@nestjs/common';
import { PersonelService } from './personel.service';
import { PersonelController } from './personel.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PersonelController],
  providers: [PersonelService, PrismaService],
})
export class PersonelModule {}
