import { IsDate, IsDefined, IsOptional, IsString } from "class-validator";

export class CreateVisitationDto {
  @IsDefined()
  @IsString()
  clientId: string;

  @IsOptional()
  @IsString()
  note: string;

  @IsDefined()
  @IsDate()
  dateTime: string;
}
