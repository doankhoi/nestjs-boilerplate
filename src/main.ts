import {
  LoggerMiddleware,
  LoggingInterceptor,
  TimeoutInterceptor,
  ValidationPipe,
} from '@common';
import { CustomLogger } from '@configs';
import { env } from '@environments';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import rateLimit from 'express-rate-limit';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger(),
  });

  app.use(compression());
  app.use(bodyParser.json({ limit: '50mb' }));

  env.get('environment') === 'development' && app.use(LoggerMiddleware);

  app.use(
    bodyParser.urlencoded({
      limit: '50mb',
      extended: true,
      parameterLimit: 50000,
    }),
  );

  app.use(
    cors({
      origin: true,
    }),
  );

  app.use(
    rateLimit({
      windowMs: 1000 * 60 * 60,
      max: env.get('rateLimit'),
      message:
        '⚠️  Too many request created from this IP, please try again after an hour',
    }),
  );

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  app.enableShutdownHooks();

  await app.listen(env.get('port'));
}
bootstrap();
