import { Injectable } from "@nestjs/common";
import { CreateMedicationDto } from "./dto/create-medication.dto";
import { UpdateMedicationDto } from "./dto/update-medication.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class MedicationService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createMedicationDto: CreateMedicationDto) {
    const createdClientMedication =
      await this.prismaService.clientMedication.create({
        data: {
          medication: {
            connect: { suklId: createMedicationDto.suklId }, // join id from SUKL
          },
          Client: {
            connect: { id: createMedicationDto.clientId }, // join client id
          },
          MedicationDose: {
            createMany: {
              data: createMedicationDto?.doses,
            },
          },
        },
      });

    return {
      message: "Created client medication with doses",
    };
  }

  protected findQuery = {
    include: {
      medication: true,
      Client: {
        select: {
          id: true,
        },
      },
      MedicationDose: true,
    },
  };

  async findAll() {
    const clientMedicationList =
      await this.prismaService.clientMedication.findMany(this.findQuery);

    return {
      data: clientMedicationList,
    };
  }

  async findAllByClient(clientId: string) {
    const clientMedicationList =
      await this.prismaService.clientMedication.findMany({
        ...this.findQuery,
        where: { clientId: clientId },
      });

    return {
      data: clientMedicationList,
    };
  }

  async findOne(id: number) {
    const clientMedication =
      await this.prismaService.clientMedication.findUnique({
        ...this.findQuery,
        where: { id },
      });

    return {
      data: clientMedication,
    };
  }

  async update(id: number, updateMedicationDto: UpdateMedicationDto) {
    const clientMedication = await this.prismaService.clientMedication.update({
      where: { id },
      data: updateMedicationDto,
    });

    return {
      message: `Updated client medication #${id} of ${clientMedication.clientId}`,
    };
  }

  async remove(id: number) {
    await this.prismaService.clientMedication.delete({ where: { id } });

    return {
      message: `Removed client medication #${id} `,
    };
  }
}
