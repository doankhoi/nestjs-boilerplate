import { registerEnumType } from '@nestjs/graphql';

export enum CampaignStatus {
  LISTED,
  UNLISTED,
}

registerEnumType(CampaignStatus, {
  name: 'CampaignStatus',
});
