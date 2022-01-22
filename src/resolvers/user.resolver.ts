import { AuthGuard, CurrentUser, CurrentUserAddress } from '@common';
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
  @UseGuards(AuthGuard)
  async signup(
    @Args({ name: 'input', type: () => SignupDto, defaultValue: {} })
    input: SignupDto = {},
    @CurrentUserAddress() userAddress: string | null,
  ): Promise<User> {
    const { email } = input;
    if (!userAddress) {
      throw new UserInputError('Not found wallet address');
    }

    const walletAddress = userAddress.toLowerCase();
    let user = await this.userService.findUserByWalletAddress(walletAddress);
    if (!user && email) {
      user = await this.userService.findUserByEmail(email);
    }

    if (user) {
      throw new UserInputError('User already exists');
    }

    return this.userService.signup(new User({ ...input, walletAddress }));
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
