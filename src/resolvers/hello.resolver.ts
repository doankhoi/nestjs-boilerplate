import { HelloMessage } from '@entities';
import { Resolver, Query } from '@nestjs/graphql';

@Resolver('HelloMessage')
export class HelloWorldResolver {
  @Query(() => HelloMessage)
  async hello(): Promise<HelloMessage> {
    return { message: 'So cool' };
  }
}
