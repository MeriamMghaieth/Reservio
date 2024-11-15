import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Paiement, Prisma, User } from '@prisma/client';
import { CreatePaymentDto } from './paymentDTO/create-payment.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async findUserById(userId: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        ID: userId,
      },
    });
    return user;
  }

  async create(
    createPaymentDto: CreatePaymentDto,
    userId: number,
  ): Promise<Paiement> {
    console.log('UserID received in create method:', userId);

    // Récupérer l'utilisateur par son ID
    const user = await this.findUserById(userId);

    if (!user) {
      console.error('User not found');
      throw new NotFoundException('User not found');
    }

    console.log('User found:', user);

    // Créer le paiement associé à l'utilisateur
    const createdPayment = await this.prisma.paiement.create({
      data: {
        montant: createPaymentDto.montant,
        NumCarte: createPaymentDto.NumCarte,
        userId: userId,
      },
    });

    console.log('Payment created:', createdPayment);

    return createdPayment;
  }

  async findAll(): Promise<Paiement[]> {
    return this.prisma.paiement.findMany();
  }

  async findOne(id: number): Promise<Paiement | null> {
    return this.prisma.paiement.findUnique({
      where: {
        ID: id,
      },
    });
  }

  async update(
    id: number,
    data: Prisma.PaiementUpdateInput,
  ): Promise<Paiement> {
    return this.prisma.paiement.update({ where: { ID: id }, data });
  }

  async remove(id: number): Promise<Paiement> {
    return this.prisma.paiement.delete({ where: { ID: id } });
  }

  async findPaymentsByUserId(userId: number): Promise<Paiement[]> {
    return this.prisma.paiement.findMany({
      where: {
        userId: userId,
      },
    });
  }
}
