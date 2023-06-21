import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import validationPipe from './app.validationPipe';
import { setSwagger } from './app.swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(validationPipe);

  setSwagger(app);

  await app.listen(3000);
}
bootstrap();
