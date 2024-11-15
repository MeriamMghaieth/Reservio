import { Role } from '@prisma/client';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsNotEmpty()
  @IsString()
  prenom: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  motDePasse: string;

  @IsNotEmpty()
  @IsString()
  role: Role;
}
