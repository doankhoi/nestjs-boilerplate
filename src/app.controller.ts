import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller()
export class AppController {
  @Get('health-check')
  getHealthCheck(@Req() _request: Request) {
    return {
      message: 'You are very handsome :)',
    };
  }
}
