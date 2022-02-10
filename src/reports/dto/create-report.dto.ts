import { IsDate, IsDefined, IsInt, IsString, Max, Min } from "class-validator";

export class CreateReportDto {
  @IsDefined()
  @IsDate()
  date: Date;

  @IsDefined()
  @IsInt()
  @Max(1)
  @Min(0)
  type: 1 | 0;

  @IsDefined()
  @IsString()
  content: string;
}
