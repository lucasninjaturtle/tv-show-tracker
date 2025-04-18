import { InputType, Field, Int, ID } from '@nestjs/graphql';

@InputType()
export class CreateEpisodeInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  synopsis?: string;

  @Field(() => Int)
  season: number;

  @Field(() => Int)
  episodeNumber: number;

  @Field(() => Date, { nullable: true })
  releaseDate?: Date;

  @Field(() => ID)
  showId: string;
}