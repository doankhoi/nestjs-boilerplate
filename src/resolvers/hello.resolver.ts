import { HelloMessage } from '@entities';
import { Resolver, Query } from '@nestjs/graphql';

@Resolver('HelloMessage')
export class HelloWorldResolver {
  @Query()
  async hello(): Promise<HelloMessage> {
    return { message: 'So cool' };
  }
}
