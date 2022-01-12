import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import * as chalk from 'chalk';
import { env } from '@environments';

export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getArgs()[3]) {
      const parentType = context.getArgs()[3]['parentType'];
      const fieldName = chalk
        .hex(env.get('logColor'))
        .bold(`${context.getArgs()[3]['fieldName']}`);
      return next.handle().pipe(
        tap(() => {
          Logger.debug(`==> ${parentType} » ${fieldName}`, 'GraphQL');
        }),
      );
    } else {
      const parentType = chalk
        .hex(env.get('logColor'))
        .bold(`${context.getArgs()[0].route.path}`);
      const fieldName = chalk
        .hex(env.get('logColor'))
        .bold(`${context.getArgs()[0].route.stack[0].method}`);
      return next.handle().pipe(
        tap(() => {
          Logger.debug(`==> ${parentType} » ${fieldName}`, 'GraphQL');
        }),
      );
    }
  }
}
