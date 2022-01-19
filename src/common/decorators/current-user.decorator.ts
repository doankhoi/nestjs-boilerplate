import { User } from '@entities';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User | null => {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    if (req['user']) {
      return req['user'];
    }

    if (req.raw && req.raw['user']) {
      return req.raw['user'];
    }

    return null;
  },
);
