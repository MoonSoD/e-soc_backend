import { Test, TestingModule } from '@nestjs/testing';
import { PersonelController } from './personel.controller';
import { PersonelService } from './personel.service';

describe('PersonelController', () => {
  let controller: PersonelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonelController],
      providers: [PersonelService],
    }).compile();

    controller = module.get<PersonelController>(PersonelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
