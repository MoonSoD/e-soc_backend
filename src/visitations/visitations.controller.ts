import { Controller, Get, Post, Body, Patch, Param, Delete, Header, Res } from "@nestjs/common";
import { VisitationsService } from "./visitations.service";
import { CreateVisitationDto } from "./dto/create-visitation.dto";
import { UpdateVisitationDto } from "./dto/update-visitation.dto";
import { Response } from "express";

@Controller("visitations")
export class VisitationsController {
  constructor(private readonly visitationsService: VisitationsService) {}

  @Post()
  async create(@Body() createVisitationDto: CreateVisitationDto) {
    const createdVisit = await this.visitationsService.create(createVisitationDto);

    return {
      data: createdVisit,
      message: "Created visit",
    };
  }

  @Get()
  async findAll() {
    const foundVisits = await this.visitationsService.findAll();

    return {
      data: foundVisits,
      message: "Fetched all visits",
    };
  }

  @Get("/export")
  @Header("Content-Type", "text/xlsx")
  async exportAll(@Res() res: Response) {
    const exportedSheet = await this.visitationsService.exportAll();

    res.download(exportedSheet);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const foundVisit = await this.visitationsService.findOne(+id);

    return {
      data: foundVisit,
    };
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateVisitationDto: UpdateVisitationDto) {
    const updatedVisit = await this.visitationsService.update(+id, updateVisitationDto);

    return {
      data: updatedVisit,
    };
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    const deletedVisit = await this.visitationsService.remove(+id);

    return {
      data: deletedVisit,
    };
  }
}
