import { Module } from '@nestjs/common';
import { PersonelService } from './personel.service';
import { PersonelController } from './personel.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [PersonelController],
  providers: [PersonelService, PrismaService],
  exports: [PersonelService],
})
export class PersonelModule {}
