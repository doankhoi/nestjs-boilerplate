import { Injectable } from '@nestjs/common';
import { TemplateRepository } from '@repositories';

@Injectable()
export class TemplateService {
  public templateRepository: TemplateRepository;

  constructor() {
    this.templateRepository = new TemplateRepository();
  }
}
