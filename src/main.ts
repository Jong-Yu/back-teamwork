import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import validationPipe from './app.validationPipe';
import { setSwagger } from './app.swagger';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(passport.initialize());

  app.useGlobalPipes(validationPipe);

  // Swagger
  setSwagger(app);

  await app.listen(3000);
}
bootstrap();
