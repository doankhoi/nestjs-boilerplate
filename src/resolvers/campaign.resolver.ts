import { AuthGuard, CurrentUser } from '@common';
import { CreateCampaignDto } from '@dtos';
import { Campaign, User } from '@entities';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TemplateService, CampaignService } from '@services';
import { UserInputError, ForbiddenError } from 'apollo-server-core';

@Resolver(() => Campaign)
export class CampaignResolver {
  constructor(
    private templateService: TemplateService,
    private campaignService: CampaignService,
  ) {}

  @Mutation(() => Campaign)
  @UseGuards(AuthGuard)
  async createCampaign(
    @Args('input') input: CreateCampaignDto,
    @CurrentUser() user: User | null,
  ): Promise<Campaign> {
    if (!user) {
      throw new ForbiddenError(`Not found user`);
    }
    console.log('Enter here !');
    const { templateId } = input;
    const template = await this.templateService.templateRepository.findById(
      templateId,
    );
    console.log('Enter here');

    if (!template) {
      throw new UserInputError(`Not found template id: ${templateId}`);
    }

    return await this.campaignService.campaignRepository.create(
      new Campaign(input),
    );
  }
}
