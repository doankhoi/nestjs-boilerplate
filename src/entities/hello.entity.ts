import { Field, ObjectType, Directive } from '@nestjs/graphql';
import { Expose, plainToClass } from 'class-transformer';

@ObjectType()
export class HelloMessage {
  @Expose()
  @Field((type) => String)
  message: string;

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
