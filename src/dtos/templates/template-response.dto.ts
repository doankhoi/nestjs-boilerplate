import { Template } from '@entities';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TemplatesResponseDto {
  @Field(() => [Template])
  templates: Template[];

  @Field()
  total: number;

  @Field()
  offset: number;
}
