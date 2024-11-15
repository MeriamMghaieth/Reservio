import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Categorie, Prisma } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CategorieCreateInput): Promise<Categorie> {
    return this.prisma.categorie.create({ data });
  }

  async findAll(): Promise<Categorie[]> {
    try {
      return await this.prisma.categorie.findMany();
    } catch (error) {
      console.error('Error fetching categories from database:', error);
      throw new Error('Error fetching categories from database');
    }
  }

  async findOne(id: number): Promise<Categorie> {
    return this.prisma.categorie.findUnique({ where: { ID: id } });
  }

  async update(
    id: number,
    data: Prisma.CategorieUpdateInput,
  ): Promise<Categorie> {
    return this.prisma.categorie.update({ where: { ID: id }, data });
  }

  async remove(id: number): Promise<Categorie> {
    return this.prisma.categorie.delete({ where: { ID: id } });
  }
}
