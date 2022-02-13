import { Controller, Get } from "@nestjs/common";
import { StatsService } from "./stats.service";

@Controller("stats")
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  async findAll() {
    const stats = await this.statsService.findAll();

    return {
      data: stats,
    };
  }
}
