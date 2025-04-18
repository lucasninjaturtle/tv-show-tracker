import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateActorInput {
  @Field()
  name: string;

  // Si querés permitir asociar shows por ID en el seed:
  @Field(() => [ID], { nullable: true })
  showIds?: string[];
}
