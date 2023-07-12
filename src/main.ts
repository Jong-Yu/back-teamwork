import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import validationPipe from './app.validationPipe';
import { setSwagger } from './app.swagger';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter());

  app.useGlobalPipes(validationPipe);

  // Swagger
  setSwagger(app);

  await app.listen(3000);
}
bootstrap();
