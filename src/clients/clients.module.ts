import { Module } from "@nestjs/common";
import { ClientsService } from "./clients.service";
import { ClientsController } from "./clients.controller";
import { PrismaService } from "../prisma/prisma.service";
import { ExportService } from "../utils/export/export.service";

@Module({
  controllers: [ClientsController],
  providers: [ClientsService, PrismaService, ExportService],
})
export class ClientsModule {}
