import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateShowInput } from './create-show.input';
import { IsOptional, IsUUID } from 'class-validator';

@InputType()
export class UpdateShowInput extends PartialType(CreateShowInput) {
  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsUUID('4', { each: true })
  actorIds?: string[];
}
