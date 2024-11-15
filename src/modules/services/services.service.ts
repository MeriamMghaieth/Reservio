import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Service, User } from '@prisma/client';
import * as fs from 'fs/promises';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { CreateServiceDto } from './service dto/create-service.dto';
import { UpdateServiceDto } from './service dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async create(
    createServiceDto: CreateServiceDto,
    file: Express.Multer.File,
  ): Promise<Service> {
    if (!createServiceDto.Description) {
      throw new BadRequestException('Description is required.');
    }

    const uploadedImage = await this.saveImage(file);
    const date = new Date(createServiceDto.Date);
    if (isNaN(date.getTime())) {
      throw new BadRequestException('Invalid date format');
    }
    return this.prisma.service.create({
      data: {
        Titre: createServiceDto.Titre,
        Description: createServiceDto.Description,
        Prix: createServiceDto.Prix,
        Date: date.toISOString(),
        Image: uploadedImage,
        Place: createServiceDto.Place,
        userId: createServiceDto.userId,
        categorieId: createServiceDto.categorieId,
      },
    });
  }

  async findAll(): Promise<Service[]> {
    return this.prisma.service.findMany();
  }

  async findOne(id: number): Promise<Service> {
    const service = await this.prisma.service.findUnique({ where: { ID: id } });
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found.`);
    }
    return service;
  }

  async update(
    id: number,
    updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    const {
      Titre,
      Description,
      Prix,
      Date,
      Image,
      Place,
      userId,
      categorieId,
    } = updateServiceDto;

    const existingService = await this.prisma.service.findUnique({
      where: { ID: id },
    });
    if (!existingService) {
      throw new NotFoundException(`Service with ID ${id} not found.`);
    }

    // Vérification de l'existence de l'utilisateur
    if (userId) {
      const user = await this.findUserById(userId);
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found.`);
      }
    }

    // Enregistrement de l'image si elle est fournie
    let updatedImage = existingService.Image;
    if (Image) {
      updatedImage = await this.saveImage(Image);
    }

    return this.prisma.service.update({
      where: { ID: id },
      data: {
        Titre,
        Description,
        Prix,
        Date,
        Image: updatedImage,
        Place,
        userId,
        categorieId,
      },
    });
  }

  async remove(id: number): Promise<Service> {
    const service = await this.prisma.service.delete({ where: { ID: id } });
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found.`);
    }
    return service;
  }

  async findUserById(userId: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { ID: userId } });
  }

  private async saveImage(file: Express.Multer.File): Promise<string> {
    const imageDir = path.join(__dirname, '..', '..', '..', 'uploads'); // Dossier de stockage des images
    await fs.mkdir(imageDir, { recursive: true });

    const imageExtension = file.originalname.split('.').pop(); // Récupération de l'extension du fichier
    const imageName = `${uuidv4()}.${imageExtension}`; // Nom du fichier avec UUID pour éviter les doublons
    const imagePath = path.join(imageDir, imageName);

    await fs.writeFile(imagePath, file.buffer);

    return imageName;
  }
}
