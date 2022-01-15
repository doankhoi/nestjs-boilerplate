import { SignupDto } from '@dtos';
import { User } from '@entities';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '@services';
import { UserInputError } from 'apollo-server-core';

@Resolver(() => User)
export class UsersResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User)
  async signup(@Args('input') input: SignupDto): Promise<User> {
    const { walletAddress } = input;
    console.log('Enter here');
    const user = await this.userService.findUserByWalletAddress(walletAddress);
    if (user) {
      throw new UserInputError('User already existed');
    }
    return this.userService.signup(input);
  }
}
