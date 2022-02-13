import { Injectable } from "@nestjs/common";
import { CreateReportDto } from "./dto/create-report.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Request } from "express";
import { Personel } from "@prisma/client";

@Injectable()
export class ReportsService {
  constructor(private readonly prismaService: PrismaService) {}

  getNextShift(currentHours: number) {
    return currentHours === 6 ? 18 : 6;
  }

  async create(createReportDto: CreateReportDto, request: Request) {
    const currentDate = new Date();
    const user = request?.user as Personel;
    const shiftHour = currentDate.getHours() >= 6 && currentDate.getHours() < 18 ? 6 : 18;

    const reportBatch = this.prismaService.$transaction(async (prisma) => {
      const report = await prisma.report.findFirst({
        where: {
          AND: [
            {
              date: { gte: new Date(`${currentDate.toDateString()}T${shiftHour}:00`) },
            },
            {
              date: { lt: new Date(`${currentDate.toDateString()}T${this.getNextShift(shiftHour)}:00`) },
            },
          ],
        },
      });

      prisma.report.upsert({
        where: { id: report.id ?? -1 },
        create: {
          date: currentDate,
          type: shiftHour === 6 ? 1 : 0,
          revisions: {
            create: {
              editor: { connect: { id: user.id } },
              content: createReportDto.content,
            },
          },
        },
        update: {
          revisions: {
            create: {
              editor: { connect: { id: user.id } },
              content: createReportDto.content,
            },
          },
        },
      });

      return report;
    });

    return reportBatch;
  }

  findAll() {
    return this.prismaService.report.findMany({ include: { revisions: true } });
  }

  findOne(id: number) {
    return this.prismaService.report.findUnique({ where: { id } });
  }
}
