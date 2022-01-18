import { registerEnumType } from '@nestjs/graphql';

export enum CampaignMemberStatus {
  PENDING,
  APPROVED,
  DECLINED,
}

registerEnumType(CampaignMemberStatus, {
  name: 'CampaignMemberStatus',
});
