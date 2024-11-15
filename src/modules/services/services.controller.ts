import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
  UnauthorizedException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { Service as ServiceModel } from '@prisma/client';
import { RequestWithUser } from 'common/interfaces/RequestWithUser';
import { CreateServiceDto } from './service dto/create-service.dto';
import { UpdateServiceDto } from './service dto/update-service.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createServiceDto: CreateServiceDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: RequestWithUser,
  ): Promise<any> {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException('User ID is missing.');
    }

    const user = await this.servicesService.findUserById(userId);
    if (!user || user.Role !== 'SERVICE_PROVIDER') {
      throw new UnauthorizedException(
        'Only service providers can create services.',
      );
    }

    console.log('Received createServiceDto:', createServiceDto);
    console.log('Received file:', file);

    createServiceDto.userId = userId;
    return this.servicesService.create(createServiceDto, file);
  }

  @Get()
  findAll(): Promise<ServiceModel[]> {
    return this.servicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ServiceModel> {
    return this.servicesService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ): Promise<ServiceModel> {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<ServiceModel> {
    return this.servicesService.remove(+id);
  }
}
