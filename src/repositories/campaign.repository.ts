import { Campaign } from '@entities';
import { BaseRepository } from './base.repository';

export class CampaignRepository extends BaseRepository<Campaign> {
  constructor() {
    super(Campaign);
  }

  findCampaignsByUserId(userId: string, limit = 20, offset = 0) {
    return this.getRepository().findAndCount({
      where: { creatorId: userId },
      take: limit,
      skip: offset,
    });
  }

  findCampaignByShareId(shareId: string) {
    return this.getRepository().findOne({ where: { shareId } });
  }
}
