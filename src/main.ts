import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // logger
  const logger = new Logger('Bootstrap');

  // CORS
  app.enableCors();

  await app.listen(process.env.PORT);
  logger.log(`App running on port: ${process.env.PORT}`);
}
bootstrap();
