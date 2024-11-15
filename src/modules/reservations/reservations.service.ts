import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Reservation, Prisma, User } from '@prisma/client';
import { CreateReservationDto } from './ReservationDTO/CreateReservationDto';

@Injectable()
export class ReservationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: CreateReservationDto,
    userId: number,
  ): Promise<Reservation> {
    console.log('UserID received in create method:', data.userId);

    const user = await this.findUserById(data.userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
    console.log('User found:', user);

    const reservation = await this.prisma.reservation.create({
      data: {
        DATE: data.DATE,
        statut: 'PENDING',
        userId: userId,
        serviceId: data.serviceId,
      },
    });

    return reservation;
  }

  async findUserById(userId: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { ID: userId },
    });
  }

  async findAll(): Promise<Reservation[]> {
    return this.prisma.reservation.findMany();
  }

  async findOne(id: number): Promise<Reservation | null> {
    return this.prisma.reservation.findUnique({
      where: { ID: id },
    });
  }

  async update(
    id: number,
    data: Prisma.ReservationUpdateInput,
  ): Promise<Reservation> {
    return this.prisma.reservation.update({
      where: { ID: id },
      data,
    });
  }

  async remove(id: number): Promise<Reservation> {
    return this.prisma.reservation.delete({
      where: { ID: id },
    });
  }
}
