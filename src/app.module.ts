import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaService } from "./prisma/prisma.service";
import { PersonelModule } from "./personel/personel.module";
import { ClientsModule } from "./clients/clients.module";
import { RoomsModule } from "./rooms/rooms.module";
import { AuthModule } from "./auth/auth.module";
import { ExportModule } from "./utils/export/export.module";
import { VisitationsModule } from "./visitations/visitations.module";
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [PersonelModule, ClientsModule, RoomsModule, AuthModule, ExportModule, VisitationsModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
