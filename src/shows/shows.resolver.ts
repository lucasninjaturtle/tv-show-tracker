import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Inject, NotFoundException, UseGuards } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { ShowsService } from './shows.service';
import { Show } from './entities/show.entity';
import { CreateShowInput, UpdateShowInput } from './dto/inputs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => Show)
@UseGuards(JwtAuthGuard)
export class ShowsResolver {
  constructor(
    private readonly showsService: ShowsService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) { }

  @Mutation(() => Show)
  async createShow(
    @Args('createShowInput') createShowInput: CreateShowInput,
  ): Promise<Show> {
    const newShow = await this.showsService.create(createShowInput);
    await this.cacheManager.del('allShows'); // Clear cache
    return newShow;
  }

  @Query(() => [Show], { name: 'shows' })
  async findAll(): Promise<Show[]> {
    const cacheKey = 'allShows';

    const cached = await this.cacheManager.get<Show[]>(cacheKey);
    if (cached) return cached;

    const shows = await this.showsService.findAll();
    await this.cacheManager.set(cacheKey, shows, 3600); // 1 hora

    return shows;
  }

  @Query(() => Show, { name: 'show' })
  async findOne(@Args('id', { type: () => ID }) id: string): Promise<Show> {
    const cacheKey = `show:${id}`;

    const cached = await this.cacheManager.get<Show>(cacheKey);
    if (cached) return cached;

    const show = await this.showsService.findOne(id);
    if (!show) throw new NotFoundException(`Show with ID ${id} not found`);

    await this.cacheManager.set(cacheKey, show, 1800);

    return show;
  }

  @Mutation(() => Show)
  async updateShow(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateShowInput') updateShowInput: UpdateShowInput,
  ): Promise<Show> {
    const show = await this.showsService.update(id, updateShowInput);
    if (!show) throw new NotFoundException(`Cannot update. Show ${id} not found`);

    // Invalida caches relacionados
    await this.cacheManager.del('allShows');
    await this.cacheManager.del(`show:${id}`);

    return show;
  }

  @Mutation(() => Show)
  async removeShow(@Args('id', { type: () => ID }) id: string): Promise<Show> {
    const show = await this.showsService.remove(id);
    if (!show) throw new NotFoundException(`Show with ID ${id} not found`);

    // Invalida caches relacionados
    await this.cacheManager.del('allShows');
    await this.cacheManager.del(`show:${id}`);

    return show;
  }
}
