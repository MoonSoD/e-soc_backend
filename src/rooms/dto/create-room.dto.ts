import {
  IsDefined,
  IsInt,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateRoomDto {
  @IsDefined()
  @IsString()
  @Length(1, 16)
  display: string;

  @IsOptional()
  @IsInt()
  pavilon?: number;

  @IsOptional()
  @IsInt()
  level?: number;

  @IsDefined()
  @IsInt()
  max_capacity: number;
}
