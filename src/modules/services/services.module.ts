import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../prisma/prisma.module';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { JwtMiddleware } from '../auth/jwt.middleware';
@Module({
  imports: [PrismaModule],
  controllers: [ServicesController],
  providers: [ServicesService, JwtMiddleware],
})
export class ServicesModule {}
