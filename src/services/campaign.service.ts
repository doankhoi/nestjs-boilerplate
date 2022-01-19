import { Injectable } from '@nestjs/common';
import { CampaignRepository } from '@repositories';

@Injectable()
export class CampaignService {
  public campaignRepository: CampaignRepository;

  constructor() {
    this.campaignRepository = new CampaignRepository();
  }
}
