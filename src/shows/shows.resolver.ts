import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ShowsService } from './shows.service';
import { Show } from './entities/show.entity';
import { CreateShowInput, UpdateShowInput } from './dto/inputs';



@Resolver(() => Show)
export class ShowsResolver {
  constructor(private readonly showsService: ShowsService) { }

  @Mutation(() => Show)
  async createShow(@Args('createShowInput') createShowInput: CreateShowInput): Promise<Show> {
    return this.showsService.create(createShowInput);
  }

  @Query(() => [Show], { name: 'shows' })
  findAll() {
    return this.showsService.findAll();
  }

  @Query(() => Show, { name: 'show' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.showsService.findOne(id);
  }

  @Mutation(() => Show)
  updateShow(
    @Args('id', { type: () => String }) id: string,
    @Args('updateShowInput') updateShowInput: UpdateShowInput,
  ) {
    return this.showsService.update(id, updateShowInput);
  }

  @Mutation(() => Show)
  removeShow(@Args('id', { type: () => Int }) id: string) {
    return this.showsService.remove(id);
  }
}
