import { CreateActorInput } from './create-actor.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateActorInput extends PartialType(CreateActorInput) {
  @Field(() => ID)
  id: string;
}
