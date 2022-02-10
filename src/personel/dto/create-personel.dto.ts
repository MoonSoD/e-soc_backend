import { IsDefined, IsEmail, IsInt, IsOptional, IsPhoneNumber, IsString, Max, Min } from "class-validator";

export class CreatePersonelDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  password: string;

  @IsDefined()
  @IsString()
  surname: string;

  @IsDefined()
  @IsString()
  sex: string;

  @IsDefined()
  @IsPhoneNumber()
  phone: string;

  @IsDefined()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsInt()
  @Max(2)
  @Min(1)
  role: number;
}
