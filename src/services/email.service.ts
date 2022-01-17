import { Injectable } from '@nestjs/common';
import { EmailRepository } from '@repositories';

@Injectable()
export class EmailService {
  public emailRepository: EmailRepository;

  constructor() {
    this.emailRepository = new EmailRepository();
  }
}
