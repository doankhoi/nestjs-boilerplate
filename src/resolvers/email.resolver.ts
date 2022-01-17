import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ForbiddenError, UserInputError } from 'apollo-server-core';
import { CreateEmailDto } from '@dtos';
import { Email } from '@entities';
import { EmailService, UserService } from '@services';

@Resolver(() => Email)
export class EmailResolver {
  constructor(
    private emailService: EmailService,
    private userService: UserService,
  ) {}

  @Mutation(() => Email)
  async createEmail(@Args('input') input: CreateEmailDto): Promise<Email> {
    const { userId } = input;
    const user = await this.userService.userRepository.findById(userId);
    if (!user) {
      throw new UserInputError('User dont existed');
    }

    return await this.emailService.emailRepository.create(new Email(input));
  }

  @Mutation(() => Boolean)
  async openEmail(@Args('_id') _id: string) {
    const email = await this.emailService.emailRepository.findById(_id);

    if (!email) {
      throw new ForbiddenError('Email not found.');
    }

    email.isOpened = true;

    return this.emailService.emailRepository.update(email) ? true : false;
  }
}
