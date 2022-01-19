import {
  CreateTemplateDto,
  GetTemplatesDto,
  TemplatesResponseDto,
} from '@dtos';
import { Template } from '@entities';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { TemplateService } from '@services';

@Resolver(() => Template)
export class TemplateResolver {
  constructor(private templateService: TemplateService) {}

  @Query(() => TemplatesResponseDto)
  async getTemplates(
    @Args('input') input: GetTemplatesDto,
  ): Promise<TemplatesResponseDto> {
    const { limit, offset } = input;
    const [templates, total] =
      await this.templateService.templateRepository.findAndCount(limit, offset);
    return { templates, total, offset };
  }

  @Mutation(() => Template)
  async createTemplate(
    @Args('input') input: CreateTemplateDto,
  ): Promise<Template> {
    return await this.templateService.templateRepository.create(
      new Template(input),
    );
  }
}
