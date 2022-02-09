import { Test, TestingModule } from "@nestjs/testing";
import { VisitationsController } from "./visitations.controller";
import { VisitationsService } from "./visitations.service";

describe("VisitationsController", () => {
  let controller: VisitationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisitationsController],
      providers: [VisitationsService],
    }).compile();

    controller = module.get<VisitationsController>(VisitationsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
