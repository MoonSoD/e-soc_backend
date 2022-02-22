import { IsDate, IsDateString, IsDefined, IsOptional, IsString } from "class-validator";

export class CreateVisitationDto {
  @IsDefined()
  @IsString()
  clientId: string;

  @IsOptional()
  @IsString()
  note: string;

  @IsDefined()
  @IsDateString()
  dateTime: string;
}
