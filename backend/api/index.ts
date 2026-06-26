import 'dotenv/config';
import express, { type Express, type Request, type Response } from 'express';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';

let cachedServer: Express | undefined;

async function bootstrap() {
  if (!cachedServer) {
    const expressApp = express();
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    app.enableCors();
    await app.init();

    cachedServer = expressApp;
  }

  return cachedServer;
}

export default async function handler(req: Request, res: Response) {
  const server = await bootstrap();
  return server(req, res);
}
