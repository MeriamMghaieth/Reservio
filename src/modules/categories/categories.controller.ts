import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Headers,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Categorie, Prisma } from '@prisma/client';
import * as jwt from 'jsonwebtoken';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(
    @Body() createCategorieDto: Prisma.CategorieCreateInput,
    @Headers('authorization') authHeader: string,
  ): Promise<Categorie> {
    await this.validateAdminToken(authHeader);
    return this.categoriesService.create(createCategorieDto);
  }

  @Get()
  async findAll(
  ): Promise<Categorie[]> {
    try {
      const categories = await this.categoriesService.findAll();
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error.message);
      console.error('Stack Trace:', error.stack);
      throw new Error('Error fetching categories');
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Headers('authorization') authHeader: string,
  ): Promise<Categorie> {
    await this.validateAdminToken(authHeader);
    return this.categoriesService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategorieDto: Prisma.CategorieUpdateInput,
    @Headers('authorization') authHeader: string,
  ): Promise<Categorie> {
    await this.validateAdminToken(authHeader);
    return this.categoriesService.update(+id, updateCategorieDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Headers('authorization') authHeader: string,
  ): Promise<Categorie> {
    await this.validateAdminToken(authHeader);
    return this.categoriesService.remove(+id);
  }

  private async validateAdminToken(authHeader: string): Promise<void> {
    const token = authHeader?.split(' ')[1];

    if (!token) {
      console.error('Authorization header missing');
      throw new Error('Authorization header missing');
    }

    try {
      const decodedToken: any = jwt.verify(token, process.env.SECRET_KEY);

      if (!decodedToken || decodedToken.role !== 'ADMIN') {
        console.error('Unauthorized');
        throw new Error('Unauthorized');
      }
      return;
    } catch (error) {
      console.error('Error verifying token:', error.message);
      console.error('Stack Trace:', error.stack);
      throw new Error('Unauthorized');
    }
  }
}
