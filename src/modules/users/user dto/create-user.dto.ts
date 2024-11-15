import { Role } from '@prisma/client';

export class CreateUserDto {
  nom: string;
  prenom: string;
  email: string;
  num: number;
  motDePasse: string;
  role: Role = Role.CLIENT;
  static motDePasse: any;
  Validation: boolean = true;
}
