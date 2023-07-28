import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import validationPipe from './app.validationPipe';
import { setSwagger } from './app.swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter());

  app.useGlobalPipes(validationPipe);
  app.use(cookieParser());
  app.enableCors({
    origin: 'https://team-work.zeabur.app',
    credentials: true,
  });

  // Swagger
  setSwagger(app);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
