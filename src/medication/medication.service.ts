import { Injectable } from "@nestjs/common";
import { CreateMedicationDto } from "./dto/create-medication.dto";
import { UpdateMedicationDto } from "./dto/update-medication.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class MedicationService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createMedicationDto: CreateMedicationDto) {
    this.prismaService.clientMedication.create({
      data: {
        medication: {
          connect: { id: +createMedicationDto.suklId }, // join id from SUKL
        },
        Client: {
          connect: { id: createMedicationDto.clientId }, // join client id
        },
        MedicationDose: {
          create: {
            // create and join dose
            medicationId: 4,
            day: "monday",
            time: "9:00",
          },
        },
      },
    });

    return "";
  }

  findAll() {
    return `This action returns all medication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medication`;
  }

  update(id: number, updateMedicationDto: UpdateMedicationDto) {
    return `This action updates a #${id} medication`;
  }

  remove(id: number) {
    return `This action removes a #${id} medication`;
  }
}
