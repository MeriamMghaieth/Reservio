import { Module, forwardRef } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PaymentsService } from './payments.service'; // Assurez-vous du chemin correct
import { PrismaModule } from 'prisma/prisma.module';
import { PaymentsController } from './payments.controller';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [forwardRef(() => UsersModule), PrismaModule],
  providers: [AuthService, PaymentsService],
  controllers: [PaymentsController],
  exports: [PaymentsService],
})
export class PaymentsModule {}
