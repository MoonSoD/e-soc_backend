import { IsArray, IsDefined, IsOptional, IsString } from "class-validator";

interface Dose {
  day: string;
  time: string;
}

export class CreateMedicationDto {
  @IsDefined()
  @IsString()
  suklId: string;

  @IsOptional()
  @IsString()
  clientId?: string;

  @IsOptional()
  @IsArray()
  doses?: Dose[];
}
