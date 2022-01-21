import { AuthGuard, CampaignMemberStatus, CurrentUser } from '@common';
import { ApproveMemberDto } from '@dtos';
import { CampaignMember, User } from '@entities';
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CampaignMemberService, CampaignService, UserService } from '@services';
import { UserInputError, ForbiddenError } from 'apollo-server-core';

@Resolver(() => User)
export class CampaignMemberResolver {
  constructor(
    private campaignMemberService: CampaignMemberService,
    private campaignService: CampaignService,
    private userService: UserService,
  ) {}

  @Mutation(() => CampaignMember)
  @UseGuards(AuthGuard)
  async joinCampaign(
    @Args('campaignId') campaignId: string,
    @CurrentUser() user: User | null,
  ): Promise<CampaignMember> {
    if (!user) {
      throw new UserInputError('Not found wallet address');
    }
    const userId = user._id.toString();
    const campaign = await this.campaignService.campaignRepository.findById(
      campaignId,
    );

    if (!campaign) {
      throw new UserInputError('Not found the campaign');
    }

    let campaignMember =
      await this.campaignMemberService.campaignMemberRepository.findMember(
        userId,
        campaignId,
      );
    if (!campaignMember) {
      campaignMember =
        await this.campaignMemberService.campaignMemberRepository.create(
          new CampaignMember({ userId, campaignId }),
        );
    }
    return campaignMember;
  }

  @Mutation(() => CampaignMember)
  @UseGuards(AuthGuard)
  async approvedMember(
    @Args('input') input: ApproveMemberDto,
    @CurrentUser() user: User | null,
  ): Promise<CampaignMember> {
    if (!user) {
      throw new UserInputError('User not register');
    }
    const requestUserId = user._id.toString();

    const { userId, campaignId } = input;
    const campaign = await this.campaignService.campaignRepository.findById(
      campaignId,
    );
    if (!campaign) {
      throw new UserInputError('Not found the campaign');
    }

    if (campaign.creatorId !== requestUserId) {
      throw new ForbiddenError('You dont have permission');
    }

    const campaignMember =
      await this.campaignMemberService.campaignMemberRepository.findMember(
        userId,
        campaignId,
      );
    if (!campaignMember) {
      throw new UserInputError('User not in campaign');
    }
    campaignMember.status = CampaignMemberStatus.APPROVED;
    return campaignMember;
  }

  // Resolve field
  @ResolveField(() => User)
  async user(@Parent() campaignMember: CampaignMember): Promise<User> {
    return await this.userService.userRepository.findById(
      campaignMember.userId,
    );
  }
}
