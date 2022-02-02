import {
  IsDefined,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from "class-validator";

export class CreateClientDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  surname: string;

  @IsDefined()
  @IsString()
  sex: string;

  @IsDefined()
  @IsString()
  personal_no: string;

  @IsOptional()
  @IsPhoneNumber()
  phone: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsDefined()
  @IsString()
  address: string;

  @IsDefined()
  @IsString()
  country: string;
}
