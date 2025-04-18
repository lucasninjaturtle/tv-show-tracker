import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Actor } from './entities/actor.entity';
import { CreateActorInput } from './dto/create-actor.input';
import { UpdateActorInput } from './dto/update-actor.input';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { ActorsService } from './actor.service';

@Resolver(() => Actor)
@UseGuards(JwtAuthGuard)
export class ActorsResolver {
  constructor(private readonly actorsService: ActorsService) { }

  @Mutation(() => Actor)
  createActor(
    @Args('createActorInput') createActorInput: CreateActorInput,
  ): Promise<Actor> {
    return this.actorsService.create(createActorInput);
  }

  @Query(() => [Actor], { name: 'actors' })
  findAll(): Promise<Actor[]> {
    return this.actorsService.findAll();
  }

  @Query(() => Actor, { name: 'actor' })
  findOne(@Args('id', { type: () => ID }) id: string): Promise<Actor> {
    return this.actorsService.findOne(id);
  }

  @Mutation(() => Actor)
  updateActor(
    @Args('updateActorInput') updateActorInput: UpdateActorInput,
  ): Promise<Actor> {
    return this.actorsService.update(updateActorInput.id, updateActorInput);
  }

  @Mutation(() => Actor)
  removeActor(@Args('id', { type: () => ID }) id: string): Promise<Actor> {
    return this.actorsService.remove(id);
  }
}
