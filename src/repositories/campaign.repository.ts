import { Campaign } from '@entities';
import { BaseRepository } from './base.repository';

export class CampaignRepository extends BaseRepository<Campaign> {
  constructor() {
    super(Campaign);
  }
}
