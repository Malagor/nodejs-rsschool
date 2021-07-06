import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { env } from './common/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(env.PORT || 3000);
}
bootstrap();
