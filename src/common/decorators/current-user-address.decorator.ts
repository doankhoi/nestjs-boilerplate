import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUserAddress = createParamDecorator(
  (_: unknown, context: ExecutionContext): string | null => {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    if (req['currentUserAddress']) {
      return req['currentUserAddress'];
    }

    if (req.raw && req.raw['currentUserAddress']) {
      return req.raw['currentUserAddress'];
    }

    return null;
  },
);
