import { Campaign } from '@entities';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CampaignsResponseDto {
  @Field(() => [Campaign])
  campaigns: Campaign[];

  @Field()
  total: number;

  @Field()
  offset: number;
}
