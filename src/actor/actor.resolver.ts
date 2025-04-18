import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ActorService } from './actor.service';
import { Actor } from './entities/actor.entity';
import { CreateActorInput } from './dto/create-actor.input';
import { UpdateActorInput } from './dto/update-actor.input';

@Resolver(() => Actor)
export class ActorResolver {
  constructor(private readonly actorService: ActorService) {}

  @Mutation(() => Actor)
  createActor(@Args('createActorInput') createActorInput: CreateActorInput) {
    return this.actorService.create(createActorInput);
  }

  @Query(() => [Actor], { name: 'actor' })
  findAll() {
    return this.actorService.findAll();
  }

  @Query(() => Actor, { name: 'actor' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.actorService.findOne(id);
  }

  @Mutation(() => Actor)
  updateActor(@Args('updateActorInput') updateActorInput: UpdateActorInput) {
    return this.actorService.update(updateActorInput.id, updateActorInput);
  }

  @Mutation(() => Actor)
  removeActor(@Args('id', { type: () => Int }) id: number) {
    return this.actorService.remove(id);
  }
}
