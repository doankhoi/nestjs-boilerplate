import { Email } from '@entities';
import { BaseRepository } from './base.repository';

export class EmailRepository extends BaseRepository<Email> {
  constructor() {
    super(Email);
  }
}
