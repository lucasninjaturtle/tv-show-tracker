import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { Inject, NotFoundException, UseGuards } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { ShowsService } from './shows.service';
import { Show } from './entities/show.entity';
import { CreateShowInput, UpdateShowInput } from './dto/inputs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { FindAllShowsArgs } from 'src/common/dto/args/find-all-shows.args';
import { ShowGenre, ShowType } from 'src/common/enums/show.enums';
import { ShowSortBy } from 'src/common/enums/show-sort.enum';
import { SortOrder } from 'src/common/enums/sort-order.enum';


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
    await this.cacheManager.del('allShows');
    return newShow;
  }



  @Query(() => [Show], { name: 'shows' })
  async findAll(
    @Args('offset', { type: () => Int, defaultValue: 0 }) offset: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
    @Args('search', { type: () => String, nullable: true }) search?: string,
    @Args('genre', { type: () => ShowGenre, nullable: true }) genre?: ShowGenre,
    @Args('type', { type: () => ShowType, nullable: true }) type?: ShowType,
    @Args('sortBy', { type: () => ShowSortBy, nullable: true }) sortBy?: ShowSortBy,
    @Args('sortOrder', { type: () => SortOrder, nullable: true, defaultValue: SortOrder.ASC }) sortOrder?: SortOrder,
  ): Promise<Show[]> {
    const cacheKey = `allShows:${offset}:${limit}:${search || ''}:${genre || ''}:${type || ''}:${sortBy || ''}:${sortOrder}`;

    const cached = await this.cacheManager.get<Show[]>(cacheKey);
    if (cached) return cached;

    const shows = await this.showsService.findAll({
      offset,
      limit,
      search,
      genre,
      type,
      sortBy,
      sortOrder,
    });

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

    if (!show) throw new NotFoundException(`Show with ID ${id} not found`);

    await this.cacheManager.del('allShows');
    await this.cacheManager.del(`show:${id}`);

    return show;
  }


  @Mutation(() => Show)
  async removeShow(@Args('id', { type: () => ID }) id: string): Promise<Show> {
    const show = await this.showsService.remove(id);
    if (!show) throw new NotFoundException(`Show with ID ${id} not found`);


    await this.cacheManager.del('allShows');
    await this.cacheManager.del(`show:${id}`);

    return show;
  }
}
