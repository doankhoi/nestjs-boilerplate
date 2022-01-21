import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class ApproveMemberDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  campaignId: string;
}
