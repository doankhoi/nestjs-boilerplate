import { Injectable } from '@nestjs/common';
import { CampaignMemberRepository } from '@repositories';

@Injectable()
export class CampaignMemberService {
  public campaignMemberRepository: CampaignMemberRepository;

  constructor() {
    this.campaignMemberRepository = new CampaignMemberRepository();
  }
}
