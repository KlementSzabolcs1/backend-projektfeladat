import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConf = new DocumentBuilder()
    .setTitle('Backend-projektfeladat')
    .setVersion('0.1.0')
    .build();

    //setting up the swagger
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConf);
  SwaggerModule.setup('api', app, swaggerDoc);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*'
  });

  await app.listen(3000);
}

bootstrap();