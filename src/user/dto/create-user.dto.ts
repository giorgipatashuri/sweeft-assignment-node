import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @MinLength(6)
  password: string;
}
