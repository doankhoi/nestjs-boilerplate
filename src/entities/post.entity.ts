import { Field, ObjectType, Directive } from '@nestjs/graphql';
import { Expose, plainToClass } from 'class-transformer';

@ObjectType()
export class Post {
  @Expose()
  @Directive('@upper')
  @Field(() => String)
  title: string;

  @Expose()
  @Field(() => String)
  body: string;

  @Expose()
  @Field(() => Date, { nullable: true })
  createdAt?: string;

  constructor(post: Partial<Post>) {
    if (post) {
      Object.assign(
        this,
        plainToClass(Post, post, {
          excludeExtraneousValues: true,
        }),
      );
    }
  }
}
