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
import { PaymentsService } from './payments.service';
import { Paiement } from '@prisma/client';
import { CreatePaymentDto } from './paymentDTO/create-payment.dto';
import { RequestWithUser } from 'common/interfaces/RequestWithUser';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async create(
    @Body() createPaymentDto: CreatePaymentDto,
    @Req() req: RequestWithUser,
  ): Promise<Paiement> {
    const userId = req.user?.id;

    if (!userId) {
      throw new UnauthorizedException('User ID is missing.');
    }

    return this.paymentsService.create(createPaymentDto, userId);
  }

  @Get()
  async findAll(): Promise<Paiement[]> {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Paiement | null> {
    return this.paymentsService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePaymentDto: any,
  ): Promise<Paiement> {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Paiement> {
    return this.paymentsService.remove(+id);
  }

  @Get('user/:userId/payments')
  async findPaymentsByUser(
    @Param('userId') userId: string,
  ): Promise<Paiement[]> {
    return this.paymentsService.findPaymentsByUserId(+userId);
  }
}
