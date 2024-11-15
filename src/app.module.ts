import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { ServicesModule } from './modules/services/services.module';
import { PrismaModule } from 'prisma/prisma.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AdminModule } from './Admin/admin.module';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from './modules/services/MulterConfigService';
import { AuthModule } from './modules/auth/auth.module';
import { JwtMiddleware } from './modules/auth/jwt.middleware';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
    forwardRef(() => CategoriesModule),
    forwardRef(() => FavoritesModule),
    forwardRef(() => PaymentsModule),
    forwardRef(() => ReservationsModule),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
    forwardRef(() => ServicesModule),
    forwardRef(() => NotificationsModule),
    AdminModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
