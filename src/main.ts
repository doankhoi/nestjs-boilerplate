import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLogger } from '@configs';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';

import rateLimit from 'express-rate-limit';
import { env } from '@environments';
import {
  LoggerMiddleware,
  LoggingInterceptor,
  TimeoutInterceptor,
  ValidationPipe,
} from '@common';

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
