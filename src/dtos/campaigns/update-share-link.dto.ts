import { ShareType } from '@common';
import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateShareLinkDto {
  @Field()
  @IsNotEmpty()
  campaignId: string;

  @Field(() => ShareType)
  @IsEnum(ShareType)
  status: ShareType;
}
