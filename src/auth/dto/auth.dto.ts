import { IsEmail, MinLength } from 'class-validator';

export class authDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
