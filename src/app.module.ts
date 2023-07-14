import { Logger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TeamModule } from './team/team.module';

@Module({
  imports: [
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
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    AuthModule,
    UserModule,
    TeamModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
