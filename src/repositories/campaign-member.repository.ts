import { CampaignMember } from '@entities';
import { BaseRepository } from './base.repository';

export class CampaignMemberRepository extends BaseRepository<CampaignMember> {
  constructor() {
    super(CampaignMember);
  }

  findMember(userId: string, campaignId: string) {
    return this.getRepository().findOne({
      campaignId,
      userId,
    });
  }

  findCampaignMembers(campaignId: string) {
    return this.getRepository().find({ where: { campaignId } });
  }
}
