import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Episode } from './entities/episode.entity';
import { CreateEpisodeInput } from './dto/create-episode.input';
import { UpdateEpisodeInput } from './dto/update-episode.input';
import { EpisodesService } from './episode.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Episode)
@UseGuards(JwtAuthGuard)
export class EpisodesResolver {
  constructor(private readonly episodesService: EpisodesService) { }

  @Mutation(() => Episode)
  createEpisode(@Args('createEpisodeInput') input: CreateEpisodeInput): Promise<Episode> {
    return this.episodesService.create(input);
  }

  @Query(() => [Episode], { name: 'episodes' })
  findAll(): Promise<Episode[]> {
    return this.episodesService.findAll();
  }

  @Query(() => Episode, { name: 'episode' })
  findOne(@Args('id', { type: () => ID }) id: string): Promise<Episode> {
    return this.episodesService.findOne(id);
  }

  @Mutation(() => Episode)
  updateEpisode(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateEpisodeInput') input: UpdateEpisodeInput,
  ): Promise<Episode> {
    return this.episodesService.update(id, input);
  }

  @Mutation(() => Episode)
  removeEpisode(@Args('id', { type: () => ID }) id: string): Promise<Episode> {
    return this.episodesService.remove(id);
  }
}
