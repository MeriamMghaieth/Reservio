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
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { Prisma, Reservation } from '@prisma/client';
import { RequestWithUser } from 'common/interfaces/RequestWithUser';
import { CreateReservationDto } from './ReservationDTO/CreateReservationDto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  async create(
    @Body() createReservationDto: CreateReservationDto,
    @Req() req: RequestWithUser,
  ): Promise<Reservation> {
    console.log('Received DATE:', createReservationDto.DATE);
    const userId = req.user?.userId;

    if (!userId) {
      throw new UnauthorizedException('User ID is missing.');
    }
    createReservationDto.userId = userId;
    createReservationDto.DATE = new Date(createReservationDto.DATE);
    return this.reservationsService.create(createReservationDto, userId);
  }

  @Get()
  async findAll(): Promise<Reservation[]> {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Reservation> {
    return this.reservationsService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReservationDto: Prisma.ReservationUpdateInput,
  ): Promise<Reservation> {
    return this.reservationsService.update(+id, updateReservationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Reservation> {
    return this.reservationsService.remove(+id);
  }
}
