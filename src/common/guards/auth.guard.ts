import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    if (req['authError'] || (req.raw && req.raw['authError'])) {
      const error = (req['authError'] || req.raw['authError']) as HttpException;
      throw error;
    }

    return true;
  }
}
