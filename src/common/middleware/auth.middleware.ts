import { User } from '@entities';
import {
  HttpException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '@services';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'web3-token';

declare global {
  // eslint-disable-next-line
  namespace Express {
    interface Request {
      currentUserAddress: string | null;
      user?: User | null;
      authError?: HttpException | null;
    }
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, _: Response, next: NextFunction) {
    const { authorization, Authorization } = req.headers;
    const token = authorization || Authorization || '';

    if (!token) {
      req['authError'] = new UnauthorizedException('Token required');
      return next();
    }

    try {
      const { address } = await verify(token as string);
      req['currentUserAddress'] = address || null;
    } catch (error) {
      const errorMsg = error.message.includes('Token expired')
        ? error.message
        : 'Invalid token';

      req['authError'] = new UnauthorizedException(errorMsg);
    }

    if (req['currentUserAddress']) {
      const user = await this.userService.findUserByWalletAddress(
        req['currentUserAddress'],
      );
      req['user'] = user || null;
    }

    next();
  }
}
