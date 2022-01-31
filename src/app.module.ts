import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaService } from "./prisma/prisma.service";
import { PersonelModule } from "./personel/personel.module";
import { ClientsModule } from "./clients/clients.module";
import { RoomsModule } from "./rooms/rooms.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [PersonelModule, ClientsModule, RoomsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
