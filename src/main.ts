import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  );

  const config = new DocumentBuilder()
    .setTitle('To Do List')
    .setDescription('...')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const HOST = process.env.HOST || '0.0.0.0';
  const PORT = Number(process.env.PORT) || 3000;
  app.enableCors({ origin: [/^(.*)/] });

  await app.listen(PORT, HOST, () => {
    console.log(`Listening on: ${HOST}:${PORT}`);
  });
}
bootstrap();
