import { Injectable, Dependencies, forwardRef } from '@nestjs/common';
import { CreateUserDto } from './user dto/create-user.dto';
import { UpdateUserDto } from './user dto/update-user.dto';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { RegisterUserDto } from './user dto/register-user.dto';
import { AuthService } from '../auth/auth.service';
import { UpdateValidationDto } from '../auth/UpdateValidationDto';

@Injectable()
@Dependencies(forwardRef(() => PrismaService), forwardRef(() => AuthService))
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}
  async updateValidation(
    userId: number,
    updateValidationDto: UpdateValidationDto,
  ) {
    return this.prisma.user.update({
      where: { ID: userId },
      data: { Validation: updateValidationDto.Validation },
    });
  }
  // async createUser(createUserDto: CreateUserDto): Promise<User> {
  //   const hashedPassword = await this.authService.hashPassword(
  //     createUserDto.motDePasse,
  //   );
  //   return this.prisma.user.create({
  //     data: {
  //       Nom: createUserDto.nom,
  //       Prenom: createUserDto.prenom,
  //       Email: createUserDto.email,
  //       MotDePasse: hashedPassword,
  //       Role: createUserDto.role,
  //       Num: 0,
  //     },
  //   });
  // }

  async createUser(createUserDto: CreateUserDto) {
    // return this.prisma.user.create({
    //   data: {
    //     Nom: createUserDto.nom,
    //     Prenom: createUserDto.prenom,
    //     Email: createUserDto.email,
    //     Num: createUserDto.num,
    //     Role: createUserDto.role,
    //     MotDePasse: createUserDto.motDePasse,
    //     Validation: createUserDto.Validation ?? true,
    //   },
    // });
    try {
      const existingUser = await this.findOneByEmail(createUserDto.email);

      if (existingUser) {
        throw new Error('Email address already exists');
      }

      const hashedPassword = await this.authService.hashPassword(
        createUserDto.motDePasse,
      );

      const newUser = await this.prisma.user.create({
        data: {
          Nom: createUserDto.nom,
          Prenom: createUserDto.prenom,
          MotDePasse: hashedPassword,
          Email: createUserDto.email,
          Num: createUserDto.num,
          Role: createUserDto.role,
          Validation: createUserDto.Validation,
        },
      });

      return newUser;
    } catch (error) {
      console.error('Error creating user:', error.message);
      throw error;
    }
  }

  async findAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findUserById(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { ID: id },
    });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { ID: id },
      data: updateUserDto,
    });
  }

  async removeUser(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { ID: id },
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { Email: email } });
  }

  async findServiceProviders(): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        Role: 'SERVICE_PROVIDER',
      },
      include: {
        paiements: true,
      },
    });
  }

  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { Email: email } });
  }

  async findOneById(userId: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { ID: userId },
    });
  }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const createUserDto: CreateUserDto = {
      nom: registerUserDto.nom,
      prenom: registerUserDto.prenom,
      email: registerUserDto.email,
      motDePasse: registerUserDto.motDePasse,
      role: registerUserDto.role,
      num: 0,
      Validation: true,
    };

    const hashedPassword = await this.authService.hashPassword(
      createUserDto.motDePasse,
    );

    return this.prisma.user.create({
      data: {
        Nom: createUserDto.nom,
        Prenom: createUserDto.prenom,
        Email: createUserDto.email,
        MotDePasse: hashedPassword,
        Role: createUserDto.role,
        Num: 0,
      },
    });
  }
}
