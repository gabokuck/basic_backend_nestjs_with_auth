import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // logger
  const logger = new Logger('Bootstrap');

  // CORS
  app.enableCors();

  // Validaciones globales de class validator y class transformer
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // prefijo de la api
  app.setGlobalPrefix('api');

  // Configuración de swagger
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Backend Gestión Escolar')
    .setDescription('Gestión Escolar API Documentation')
    .setVersion('1.0')
    .addTag('Auth', 'Modulo de autenticación')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Sistema RRC',
  });

  await app.listen(process.env.PORT);
  logger.log(`App running on port: ${process.env.PORT}`);
}
bootstrap();
