import { Field, ObjectType, Directive } from '@nestjs/graphql';
import { Expose, plainToClass } from 'class-transformer';

@ObjectType()
export class HelloMessage {
  @Expose()
  @Directive('@upper')
  @Field((type) => String)
  message: string;

  @Expose()
  @Field((type) => Date, { nullable: true })
  createdAt?: string;

  constructor(helloMessage: Partial<HelloMessage>) {
    if (helloMessage) {
      Object.assign(
        this,
        plainToClass(HelloMessage, helloMessage, {
          excludeExtraneousValues: true,
        }),
      );
    }
  }
}
