import { IsArray, IsDefined, IsOptional, IsString } from "class-validator";

export class CreateMedicationDto {
  @IsDefined()
  @IsString()
  suklId: string;

  @IsOptional()
  @IsString()
  clientId?: string;

  @IsOptional()
  @IsArray()
  doses?: [];
}
