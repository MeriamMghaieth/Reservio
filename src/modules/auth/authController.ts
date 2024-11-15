import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/modules/users/user dto/create-user.dto';
import { RegisterServiceProviderDto } from './RegisterServiceProviderDto';
import { Role } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    console.log('Login request received:', loginDto);
    try {
      const token = await this.authService.login(
        loginDto.email,
        loginDto.password,
      );
      console.log('Token generated:', token);
      return {
        success: true,
        ...token,
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Post('signup/client')
  async signUp(@Body() createUserDto: CreateUserDto) {
    createUserDto.role = Role.CLIENT;

    const userId = await this.authService.signUp(createUserDto);
    return { userId };
  }
  @Post('signup/admin')
  async signUpAdmin(@Body() createUserDto: CreateUserDto) {
    createUserDto.role = Role.ADMIN;

    const userId = await this.authService.signUpAdmin(createUserDto);
    return { userId };
  }

  // @Post('signup/service-provider')
  // async signUpServiceProvider(
  //   @Body() createProviderDto: RegisterServiceProviderDto,
  // ) {
  //   createProviderDto.role = Role.SERVICE_PROVIDER;

  //   const userId =
  //     await this.authService.signUpServiceProvider(createProviderDto);
  //   return { userId };
  // }

  @Post('signup/service-provider')
  async signUpServiceProvider(@Body() createProviderDto: CreateUserDto) {
    createProviderDto.role = Role.SERVICE_PROVIDER;
    createProviderDto.Validation = true;
    console.log(createProviderDto);
    const userId =
      await this.authService.signUpServiceProvider(createProviderDto);
    return { userId };
  }
}