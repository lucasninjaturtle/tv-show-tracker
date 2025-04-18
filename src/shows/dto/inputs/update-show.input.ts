import { CreateShowInput } from './create-show.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateShowInput extends PartialType(CreateShowInput) {
  @Field(() => String)
  id: string;
}
