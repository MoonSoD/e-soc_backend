import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { PrismaService } from "../prisma/prisma.service";
import * as tmp from "tmp";
import { Workbook } from "exceljs";

@Injectable()
export class ClientsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createClientDto: CreateClientDto) {
    return this.prismaService.client.create({
      data: createClientDto,
    });
  }

  findAll() {
    return this.prismaService.client.findMany();
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
