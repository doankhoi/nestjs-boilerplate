import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsNumber } from 'class-validator';

@InputType()
export class GetCampaignsDto {
  @Field(() => Number, { nullable: true, defaultValue: 20 })
  @IsNumber()
  @IsOptional()
  limit = 20;

  @Field(() => Number, { nullable: true, defaultValue: 0 })
  @IsNumber()
  @IsOptional()
  offset = 0;
}
