import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { UserService } from '@services';
import { StatisticsMemberEmail } from '@shared';

@Injectable()
export class ScheduleTasksService {
  private readonly logger = new Logger(ScheduleTasksService.name);

  constructor(private userService: UserService) {}

  @Cron('45 * * * * *')
  async statisticsMembers() {
    this.logger.debug(`Tasks: statisticsMembers is running`);
    const user = await this.userService.findUserByEmail('doankhoi@cohost.vn');
    console.log(user);
    const email = new StatisticsMemberEmail();
    email.sendEmail(user);
  }
}
