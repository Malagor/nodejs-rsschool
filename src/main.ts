import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  let app;
  const nestMode = process.env['NESTJS_MODE'];

  if (nestMode === 'express') {
    app = await NestFactory.create(AppModule, {});
  } else if (nestMode === 'fastify') {
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter()
    );
  } else {
    process.exit(1);
  }

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Trello Service')
    .setDescription("Let's try to create a competitor for Trello!")
    .setVersion('1.0.0')
    .addTag('Trello')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/doc', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env['PORT'] || 3000, () => {
    process.stdout.write(
      `App start in "${nestMode.toUpperCase()}-MODE" at http://localhost:${
        process.env['PORT']
      }`
    );
  });
}
bootstrap();
