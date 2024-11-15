import { Module } from '@nestjs/common';

import { PrismaModule } from '../../../prisma/prisma.module';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { NotificationsService } from '../notifications/notifications.service';

@Module({
  imports: [PrismaModule],
  controllers: [ReservationsController],
  providers: [ReservationsService, NotificationsService],
  exports: [ReservationsService],
})
export class ReservationsModule {}
