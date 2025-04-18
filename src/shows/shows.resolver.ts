import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { ShowsService } from './shows.service';
import { Show } from './entities/show.entity';
import { CreateShowInput, UpdateShowInput } from './dto/inputs';

@Resolver(() => Show)
export class ShowsResolver {
  constructor(private readonly showsService: ShowsService) { }

  @Mutation(() => Show)
  async createShow(
    @Args('createShowInput') createShowInput: CreateShowInput,
  ): Promise<Show> {
    return this.showsService.create(createShowInput);
  }

  @Query(() => [Show], { name: 'shows' })
  async findAll(): Promise<Show[]> {
    return this.showsService.findAll();
  }

  @Query(() => Show, { name: 'show' })
  async findOne(@Args('id', { type: () => ID }) id: string): Promise<Show> {
    const show = await this.showsService.findOne(id);
    if (!show) throw new NotFoundException(`Show with ID ${id} not found`);
    return show;
  }

  @Mutation(() => Show)
  async updateShow(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateShowInput') updateShowInput: UpdateShowInput,
  ): Promise<Show> {
    const show = await this.showsService.update(id, updateShowInput);
    if (!show) throw new NotFoundException(`Cannot update. Show ${id} not found`);
    return show;
  }

  @Mutation(() => Show)
  async removeShow(@Args('id', { type: () => ID }) id: string): Promise<Show> {
    const show = await this.showsService.remove(id);
    if (!show) throw new NotFoundException(`Show with ID ${id} not found`);
    return show;
  }
}
