import { Post } from '@entities';
import { Resolver, Query } from '@nestjs/graphql';
import { PostService } from '@services';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private postService: PostService) {}

  @Query(() => [Post])
  async posts() {
    return this.postService.posts();
  }
}
