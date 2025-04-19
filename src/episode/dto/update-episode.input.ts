import { InputType, Field, PartialType, ID, Int } from '@nestjs/graphql';
import { CreateEpisodeInput } from './create-episode.input';

@InputType()
export class UpdateEpisodeInput extends PartialType(CreateEpisodeInput) { }

