import { Injectable } from "@nestjs/common";
import { CreateVisitationDto } from "./dto/create-visitation.dto";
import { UpdateVisitationDto } from "./dto/update-visitation.dto";
import { PrismaService } from "../prisma/prisma.service";
import { ExportService } from "../utils/export/export.service";

@Injectable()
export class VisitationsService {
  constructor(readonly prismaService: PrismaService, private readonly exportService: ExportService) {}

  create(createVisitationDto: CreateVisitationDto) {
    return this.prismaService.visitation.create({
      data: {
        client: { connect: { id: createVisitationDto.clientId } },
        note: createVisitationDto.note,
        dateTime: new Date(createVisitationDto.dateTime),
      },
    });
  }

  findAll() {
    return this.prismaService.visitation.findMany({ include: { client: true } });
  }

  async exportAll() {
    const visitations = await this.findAll();

    const exportedSheet = await this.exportService.exportData<any[]>(
      "Zoznam návštev",
      "Zoznam_navstev",
      [
        { header: "id", key: "id", width: 10 },
        { header: "klient", key: "client", width: 20 },
        { header: "dátum a čas", key: "dateTime", width: 20 },
        { header: "poznámka", key: "note", width: 50 },
      ],
      visitations.map((visit) => ({ ...visit, client: `${visit.client.name} ${visit.client.surname}` })),
    );

    return exportedSheet;
  }

  findOne(id: number) {
    return this.prismaService.visitation.findMany({ where: { id }, include: { client: true } });
  }

  update(id: number, updateVisitationDto: UpdateVisitationDto) {
    return this.prismaService.visitation.update({ where: { id }, data: updateVisitationDto });
  }

  remove(id: number) {
    return this.prismaService.visitation.delete({ where: { id } });
  }
}
