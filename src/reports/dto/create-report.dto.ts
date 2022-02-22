import { IsDate, IsDateString, IsDefined, IsInt, IsString, Max, Min } from "class-validator";

export class CreateReportDto {
  @IsDefined()
  @IsString()
  content: string;
}
