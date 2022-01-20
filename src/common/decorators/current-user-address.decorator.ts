import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUserAddress = createParamDecorator(
  (_: unknown, context: ExecutionContext): string | null => {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    if (req['currentUserAddress']) {
      const currentUserAddress = req['currentUserAddress'];
      return (currentUserAddress as string).toLowerCase();
    }

    if (req.raw && req.raw['currentUserAddress']) {
      const currentUserAddress = req.raw['currentUserAddress'];
      return (currentUserAddress as string).toLowerCase();
    }

    return null;
  },
);
