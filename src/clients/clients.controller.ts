import { Body, Controller, Delete, Get, Header, Param, Patch, Post, Res } from "@nestjs/common";
import { ClientsService } from "./clients.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { Role, Roles } from "../personel/roles/role.decorator";
import { Response } from "express";
import { ExportService } from "../utils/export/export.service";

@Controller("clients")
export class ClientsController {
  constructor(private readonly clientsService: ClientsService, private readonly exportService: ExportService) {}

  @Role(Roles.ADMIN)
  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    const createdClient = await this.clientsService.create(createClientDto);

    return {
      data: createdClient,
      message: "Created client",
    };
  }

  @Get()
  async findAll() {
    const foundClients = await this.clientsService.findAll();

    return {
      data: foundClients,
      message: "Fetched all clients",
    };
  }

  @Get("/export")
  @Header("Content-Type", "text/csv")
  async exportAll(@Res() res: Response) {
    const clients = await this.clientsService.findAll();
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

    res.download(exportedSheet);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.clientsService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Role(Roles.ADMIN)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.clientsService.remove(id);
  }
}
