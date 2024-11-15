import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Patch,
  UnauthorizedException,
  Headers,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from './users.service';
import { CreateUserDto } from './user dto/create-user.dto';
import { UpdateUserDto } from './user dto/update-user.dto';
import { RegisterUserDto } from './user dto/register-user.dto';
import * as jwt from 'jsonwebtoken';
import { UpdateValidationDto } from '../auth/UpdateValidationDto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Patch(':id/validation')
  async updateValidation(
    @Param('id') id: string,
    @Body() updateValidationDto: UpdateValidationDto,
    @Headers('authorization') authHeader: string,
  ) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Unauthorized');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      return this.usersService.updateValidation(+id, updateValidationDto);
    } catch (err) {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  @Get('service-providers')
  async getServiceProviders(
    @Headers('authorization') authHeader: string,
  ): Promise<User[]> {
    const token = authHeader?.split(' ')[1];

    if (!token) {
      throw new Error('Authorization header missing');
    }

    try {
      const decodedToken: any = jwt.verify(token, process.env.SECRET_KEY);

      if (!decodedToken || decodedToken.role !== 'ADMIN') {
        throw new Error('Unauthorized');
      }
      return this.usersService.findServiceProviders();
    } catch (error) {
      console.error('Error verifying token:', error);
      throw new Error('Unauthorized');
    }
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    const createUserDto: CreateUserDto = {
      nom: registerUserDto.nom,
      prenom: registerUserDto.prenom,
      email: registerUserDto.email,
      motDePasse: registerUserDto.motDePasse,
      role: registerUserDto.role,
      num: 0,
      Validation: true,
    };
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findUserById(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    return this.usersService.removeUser(+id);
  }
}
