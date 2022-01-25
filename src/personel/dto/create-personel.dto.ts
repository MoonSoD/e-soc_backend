import { IsDefined, IsEmail, IsPhoneNumber, IsString } from 'class-validator';

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
}
