import { AuthGuard, CurrentUser } from '@common';
import {
  CampaignsResponseDto,
  CreateCampaignDto,
  GetCampaignsDto,
} from '@dtos';
import { Campaign, CampaignMember, Template, User } from '@entities';
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  TemplateService,
  CampaignService,
  UserService,
  CampaignMemberService,
} from '@services';
import { UserInputError, ForbiddenError } from 'apollo-server-core';

@Resolver(() => Campaign)
export class CampaignResolver {
  constructor(
    private templateService: TemplateService,
    private campaignService: CampaignService,
    private userService: UserService,
    private campaignMemberService: CampaignMemberService,
  ) {}

  @Query(() => CampaignsResponseDto)
  @UseGuards(AuthGuard)
  async getCampaigns(
    @Args('input') input: GetCampaignsDto,
    @CurrentUser() user: User | null,
  ): Promise<CampaignsResponseDto> {
    const { limit, offset } = input;

    if (!user) {
      throw new ForbiddenError('User not register.');
    }

    const [campaigns, total] =
      await this.campaignService.campaignRepository.findCampaignsByUserId(
        user._id.toString(),
        limit,
        offset,
      );
    return { campaigns, total, offset };
  }

  @Query(() => Campaign)
  async getCampaign(@Args('campaignId') campaignId: string): Promise<Campaign> {
    const campaign = await this.campaignService.campaignRepository.findById(
      campaignId,
    );
    return campaign;
  }

  @Mutation(() => Campaign)
  @UseGuards(AuthGuard)
  async createCampaign(
    @Args('input') input: CreateCampaignDto,
    @CurrentUser() user: User | null,
  ): Promise<Campaign> {
    if (!user) {
      throw new ForbiddenError(`User not register.`);
    }
    const { templateId } = input;
    const template = await this.templateService.templateRepository.findById(
      templateId,
    );

    if (!template) {
      throw new UserInputError(`Not found template id: ${templateId}`);
    }

    return await this.campaignService.campaignRepository.create(
      new Campaign({ ...input, creatorId: user._id.toString() }),
    );
  }

  // Resolve fields
  @ResolveField(() => Template)
  async template(@Parent() campaign: Campaign): Promise<Template> {
    return await this.templateService.templateRepository.findById(
      campaign.templateId,
    );
  }

  @ResolveField(() => [CampaignMember])
  async members(@Parent() campaign: Campaign): Promise<CampaignMember[]> {
    return await this.campaignMemberService.campaignMemberRepository.findCampaignMembers(
      campaign._id.toString(),
    );
  }

  @ResolveField(() => User)
  async creator(@Parent() campaign: Campaign): Promise<User> {
    return await this.userService.userRepository.findById(campaign.creatorId);
  }
}
