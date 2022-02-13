import { Module } from "@nestjs/common";
import { VisitationsService } from "./visitations.service";
import { VisitationsController } from "./visitations.controller";
import { PrismaService } from "../prisma/prisma.service";
import { ExportService } from "../utils/export/export.service";

@Module({
  controllers: [VisitationsController],
  providers: [VisitationsService, PrismaService, ExportService],
})
export class VisitationsModule {}
