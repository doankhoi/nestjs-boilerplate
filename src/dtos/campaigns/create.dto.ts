import { Field, InputType } from '@nestjs/graphql';
import { TemplatePosition } from '@common';
import {
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsString,
  IsPositive,
  IsUrl,
} from 'class-validator';

@InputType()
export class CreateCampaignDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  logo?: string;

  @Field(() => TemplatePosition)
  @IsEnum(TemplatePosition)
  @IsOptional()
  templatePosition: TemplatePosition;

  @Field()
  @IsNotEmpty()
  templateId: string;

  @Field()
  @IsNotEmpty()
  @IsPositive()
  numberItem: number;

  @Field()
  @IsNotEmpty()
  @IsPositive()
  amountOnItem: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  currency: string;
}
