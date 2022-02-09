import { Module } from "@nestjs/common";
import { VisitationsService } from "./visitations.service";
import { VisitationsController } from "./visitations.controller";

@Module({
  controllers: [VisitationsController],
  providers: [VisitationsService],
})
export class VisitationsModule {}
