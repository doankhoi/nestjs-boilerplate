import { Field, InputType } from '@nestjs/graphql';
import { EmailType } from '@common';
import { IsNotEmpty, IsEnum } from 'class-validator';

@InputType()
export class CreateEmailDto {
  @Field()
  @IsNotEmpty()
  userId: string;

  @Field(() => EmailType)
  @IsEnum(EmailType)
  type: EmailType;
}
