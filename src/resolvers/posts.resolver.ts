import { AuthGuard } from '@common';
import { Post } from '@entities';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { PostService } from '@services';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private postService: PostService) {}

  @UseGuards(AuthGuard)
  @Query(() => [Post])
  async posts() {
    return this.postService.posts();
  }
}
