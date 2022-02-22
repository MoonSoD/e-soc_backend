import { Body, Controller, Delete, Get, Header, Param, Patch, Post, Res } from "@nestjs/common";
import { ClientsService } from "./clients.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { Role, Roles } from "../personel/roles/role.decorator";
import { Response } from "express";

@Controller("clients")
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

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
  @Header("Content-Type", "text/xlsx")
  async exportAll(@Res() res: Response) {
    const exportedSheet = await this.clientsService.exportAll();

    res.download(exportedSheet);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const foundClient = await this.clientsService.findOne(id);

    return {
      data: foundClient,
    };
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateClientDto: UpdateClientDto) {
    const updatedClient = await this.clientsService.update(id, updateClientDto);

    return {
      data: updatedClient,
    };
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    const removedClient = await this.clientsService.remove(id);

    return {
      data: removedClient,
    };
  }
}
