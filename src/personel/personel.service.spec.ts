import { Test, TestingModule } from '@nestjs/testing';
import { PersonelService } from './personel.service';

describe('PersonelService', () => {
  let service: PersonelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonelService],
    }).compile();

    service = module.get<PersonelService>(PersonelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
