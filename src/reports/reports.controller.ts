import { Controller, Get, Post, Body, Param, Req } from "@nestjs/common";
import { ReportsService } from "./reports.service";
import { CreateReportDto } from "./dto/create-report.dto";
import { Request } from "express";

@Controller("reports")
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  async create(@Body() createReportDto: CreateReportDto, @Req() request: Request) {
    const createdReport = this.reportsService.create(createReportDto, request);

    return {
      data: createdReport,
    };
  }

  @Get()
  async findAll() {
    const foundReports = await this.reportsService.findAll();

    return {
      data: foundReports,
    };
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const foundReport = await this.reportsService.findOne(+id);

    return {
      data: foundReport,
    };
  }
}
