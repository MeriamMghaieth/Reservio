import {
  Dependencies,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from 'src/modules/users/user dto/create-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
@Dependencies(forwardRef(() => UsersService))
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}
  // async validateUser(email: string, password: string): Promise<any> {
  //   const user = await this.usersService.findOneByEmail(email);
  //   if (!user) {
  //     throw new UnauthorizedException('Invalid user');
  //   }
  //   // console.log(password);
  //   // const hash = await this.hashPassword(password);
  //   // console.log(hash);
  //   // const passwordMatch = await bcrypt.compare(hash, user.MotDePasse);
  //   // console.log(passwordMatch);
  //   // if (!passwordMatch) {
  //   //   throw new UnauthorizedException('Invalid password');
  //   // }

  //   return user;
  // }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = {
      id: user.ID,
      email: user.Email,
      role: user.Role,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '3h',
    });

    return {
      access_token: token,
      message: 'Connexion réussie',
    };
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async comparePasswords(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      const match = await bcrypt.compare(plainTextPassword, hashedPassword);
      return match;
    } catch (error) {
      console.error('Error comparing passwords:', error);
      throw new Error(
        'An unexpected error occurred during password comparison.',
      );
    }
  }

  async validateUserById(userId: number) {
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found.');
    }
    return user;
  }

  async validateToken(token: string): Promise<any> {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    console.log(
      'Plain text password before hashing (signup):',
      createUserDto.motDePasse,
    );
    const hashedPassword = await this.hashPassword(createUserDto.motDePasse);
    console.log('Hashed password (signup):', hashedPassword);
    createUserDto.motDePasse = hashedPassword;
    createUserDto.role = Role.CLIENT;
    createUserDto.Validation = true;

    const user = await this.usersService.createUser(createUserDto);
    return user;
  }

  async signUpAdmin(createUserDto: CreateUserDto): Promise<any> {
    console.log(
      'Plain text password before hashing (signup):',
      createUserDto.motDePasse,
    );
    const hashedPassword = await this.hashPassword(createUserDto.motDePasse);
    console.log('Hashed password (signup):', hashedPassword);
    createUserDto.motDePasse = hashedPassword;
    createUserDto.role = Role.ADMIN;

    const user = await this.usersService.createUser(createUserDto);
    return user;
  }

  // async signUpServiceProvider(createUserDto: CreateUserDto): Promise<any> {
  //   const hashedPassword = await this.hashPassword(createUserDto.motDePasse);
  //   createUserDto.motDePasse = hashedPassword;
  //   createUserDto.role = Role.SERVICE_PROVIDER;

  //   const user = await this.usersService.createUser(createUserDto);
  //   return user;
  // }

  async signUpServiceProvider(
    registerProviderDto: CreateUserDto,
  ): Promise<any> {
    console.log(
      'Plain text password before hashing (signup):',
      registerProviderDto.motDePasse,
    );
    const hashedPassword = await this.hashPassword(
      registerProviderDto.motDePasse,
    );
    console.log('Hashed password (signup):', hashedPassword);

    registerProviderDto.motDePasse = hashedPassword;
    registerProviderDto.role = Role.SERVICE_PROVIDER;

    const user = await this.usersService.createUser(registerProviderDto);
    return user.ID;
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.Validation) {
      throw new UnauthorizedException('Account is blocked');
    }

    // const isPasswordValid = await bcrypt.compare(password, user.MotDePasse);
    // if (!isPasswordValid) {
    //   throw new UnauthorizedException('Invalid credentials');
    // }

    return user;
  }

  // async testPasswordComparison() {
  //   const plainPassword = 'client123';
  //   const hashedPassword = await this.hashPassword(plainPassword);
  //   console.log(hashedPassword);
  //   const isMatch = await this.comparePasswords(plainPassword, hashedPassword);
  //   console.log('Passwords match:', isMatch);

  //   return isMatch;
  // }
}