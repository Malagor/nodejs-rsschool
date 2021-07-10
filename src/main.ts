// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { env } from './common/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
  });

  // const swaggerConfig = new DocumentBuilder()
  //   .setTitle('Trello Service')
  //   .setDescription("Let's try to create a competitor for Trello!")
  //   .setVersion('1.0.0')
  //   .addTag('Trello')
  //   .build();
  //
  // const document = SwaggerModule.createDocument(app, swaggerConfig);
  // SwaggerModule.setup('/doc', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(env.PORT || 3000);
}
bootstrap();
