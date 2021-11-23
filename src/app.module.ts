import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PersonelModule } from './personel/personel.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [PersonelModule, ClientsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
