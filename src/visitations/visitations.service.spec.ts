import { Test, TestingModule } from "@nestjs/testing";
import { VisitationsService } from "./visitations.service";

describe("VisitationsService", () => {
  let service: VisitationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisitationsService],
    }).compile();

    service = module.get<VisitationsService>(VisitationsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
