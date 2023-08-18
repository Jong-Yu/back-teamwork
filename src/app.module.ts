import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TeamModule } from './team/team.module';
import { ScheduleController } from './schedule/schedule.controller';
import { ScheduleService } from './schedule/schedule.service';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'log',
          }),
        ],
      },
    }),
    AuthModule,
    UserModule,
    TeamModule,
    ScheduleModule,
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class AppModule {}
