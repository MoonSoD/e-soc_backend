import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class StatsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.$transaction(async (prisma) => {
      const rooms = await prisma.room.aggregate({ _sum: { max_capacity: true } });
      const totalClients = await prisma.client.count();

      return {
        count: {
          clients: await prisma.client.count(),
          plannedVisits: await prisma.visitation.count({ where: { dateTime: { gte: new Date() } } }),
          availablePlaces: rooms._sum.max_capacity - totalClients,
        },
      };
    });
  }
}
