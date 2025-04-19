import { InputType, Int, Field, Float } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsDate,
  IsUrl,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ShowGenre, ShowType } from 'src/common/enums/show.enums';

@InputType()
export class CreateShowInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  releaseDate?: Date;

  @Field(() => ShowGenre)
  @IsEnum(ShowGenre)
  genre: ShowGenre;

  @Field(() => ShowType)
  @IsEnum(ShowType)
  type: ShowType;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  country?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  language?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @Field({ defaultValue: true })
  @IsBoolean()
  isActive: boolean;
}
