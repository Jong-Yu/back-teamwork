import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import validationPipe from './app.validationPipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(validationPipe);
  await app.listen(3000);
}
bootstrap();
