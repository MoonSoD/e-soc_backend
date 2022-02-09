import { Injectable } from "@nestjs/common";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { PrismaService } from "../prisma/prisma.service";
import { ExportService } from "../utils/export/export.service";

@Injectable()
export class ClientsService {
  constructor(private readonly prismaService: PrismaService, private readonly exportService: ExportService) {}

  create(createClientDto: CreateClientDto) {
    return this.prismaService.client.create({
      data: createClientDto,
    });
  }

  findAll() {
    return this.prismaService.client.findMany();
  }

  async exportAll() {
    const clients = await this.findAll();
    const exportedSheet = await this.exportService.exportData<any[]>(
      "Zoznam klientov",
      "Zoznam_klientov",
      [
        { header: "id", key: "id", width: 25 },
        { header: "meno", key: "name", width: 10 },
        { header: "priezvisko", key: "surname", width: 10 },
        { header: "pohlavie", key: "sex", width: 10 },
        { header: "rodné číslo", key: "personal_no", width: 12 },
        { header: "telefónne číslo", key: "phone", width: 18 },
        { header: "email", key: "email", width: 22 },
        { header: "adresa", key: "address", width: 20 },
        { header: "krajina", key: "country", width: 10 },
        { header: "dátum pridania", key: "joined_at", width: 20 },
        { header: "izba", key: "roomId", width: 10 },
      ],
      clients,
    );

    return exportedSheet;
  }

  findOne(id: string) {
    return this.prismaService.client.findUnique({ where: { id } });
  }

  update(id: string, updateClientDto: UpdateClientDto) {
    return this.prismaService.client.update({
      where: { id },
      data: updateClientDto,
    });
  }

  remove(id: string) {
    return this.prismaService.client.delete({ where: { id } });
  }
}
