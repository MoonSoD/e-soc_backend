import { IsDefined, IsEmail, IsString } from "class-validator";

export class RegisterPersonelDto {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  password: string;
}
