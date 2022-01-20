import { AuthGuard, CurrentUser } from '@common';
import { SignupDto } from '@dtos';
import { User } from '@entities';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '@services';
import { UserInputError, ForbiddenError } from 'apollo-server-core';

@Resolver(() => User)
export class UsersResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User)
  async signup(@Args('input') input: SignupDto): Promise<User> {
    const { walletAddress } = input;
    const user = await this.userService.findUserByWalletAddress(walletAddress);
    if (user) {
      throw new UserInputError('User already existed');
    }
    return this.userService.signup(input);
  }

  @Query(() => User)
  @UseGuards(AuthGuard)
  async me(@CurrentUser() user: User | null): Promise<User> {
    if (!user) {
      throw new ForbiddenError('Invalid token');
    }
    return user;
  }
}
