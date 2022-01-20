import { Template } from '@entities';
import { BaseRepository } from './base.repository';

export class TemplateRepository extends BaseRepository<Template> {
  constructor() {
    super(Template);
  }
}
