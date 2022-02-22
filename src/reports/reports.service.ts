import { Injectable, Logger } from "@nestjs/common";
import { CreateReportDto } from "./dto/create-report.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Request } from "express";
import { Personel } from "@prisma/client";
import dayjs, { Dayjs } from "dayjs";

@Injectable()
export class ReportsService {
  constructor(private readonly prismaService: PrismaService) {}

  getNextShift(currentHours: number) {
    return currentHours === 6 ? 18 : 6;
  }

  /*async create(createReportDto: CreateReportDto, request: Request) {
    const currentDate = new Date(Date.now());
    const user = request?.user as Personel;
    const shiftHour = currentDate.getHours() >= 6 && currentDate.getHours() < 18 ? 6 : 18;

    const gte = dayjs();
    const lt = dayjs().set("hour", this.getNextShift(shiftHour));
    Logger.debug(`LT: ${lt.toISOString()} - GT: ${gte.toISOString()}`);
    const reportBatch = this.prismaService.$transaction(async (prisma) => {
      const report = await prisma.report.findFirst({
        where: {
          AND: [
            {
              date: { gte: gte.toDate() },
            },
            {
              date: { lt: lt.toDate() },
            },
          ],
        },
      });

      Logger.debug(report?.id);
      const rep = await prisma.report.upsert({
        where: { id: report?.id ?? -1 },
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

      return rep;
    });

    return reportBatch;
  }

  stripTimeToHours(time: Dayjs, hour: number) {
    return time.set("hour", hour).set("minute", 0).set("second", 0);
  }

  async findNow() {
    const now = dayjs();
    const isNightShift = now.toDate().getHours() >= 18 || now.toDate().getHours() < 6;

    const nightReportDate = () => {
      if (isNightShift) {
        return this.stripTimeToHours(now, 18);
      }

      return now.set("hour", 18).set("day", now.day() - 1);
    };

    const dayReportDate = () => {
      if (isNightShift) {
        if (now.get("hour") > 0 && now.get("hour") < 6) {
          return this.stripTimeToHours(now.set("day", now.day() - 1), 6);
        }
      } else {
        return this.stripTimeToHours(now, 6);
      }

      return this.stripTimeToHours(now, 6);
    };

    const lastFullReportRevision = await this.prismaService.$transaction(async (prisma) => {
      const todayNightReport = await prisma.report.findFirst({
        where: { AND: [{ date: { gte: nightReportDate().toDate() } }, { type: 0 }] },
        include: {
          revisions: {
            orderBy: { dateTime: "desc" },
            select: { editor: { select: { name: true, surname: true } }, content: true, dateTime: true },
          },
        },
        orderBy: { date: "desc" },
      });

      const todayDayReport = await prisma.report.findFirst({
        where: { AND: [{ date: { gte: dayReportDate().toDate() } }, { type: 1 }] },
        include: {
          revisions: {
            orderBy: { dateTime: "desc" },
            select: { editor: { select: { name: true, surname: true } }, content: true, dateTime: true },
          },
        },
        orderBy: { date: "desc" },
      });

      return {
        nightReport: todayNightReport,
        dayReport: todayDayReport,
      };
    });

    return lastFullReportRevision;
  }
  */

  //async create(createReportDto: CreateReportDto) {}

  findAll() {
    return this.prismaService.report.findMany({ include: { revisions: true } });
  }

  findOne(id: number) {
    return this.prismaService.report.findUnique({ where: { id } });
  }
}
