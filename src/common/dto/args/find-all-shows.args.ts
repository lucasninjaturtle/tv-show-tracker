// src/common/dto/args/find-all-shows.args.ts
import { ArgsType, Field, Int } from '@nestjs/graphql';
import { ShowGenre, ShowType } from 'src/common/enums/show.enums';
import { ShowSortBy } from 'src/common/enums/show-sort.enum';

@ArgsType()
export class FindAllShowsArgs {
    @Field(() => Int, { defaultValue: 0 })
    offset: number;

    @Field(() => Int, { defaultValue: 10 })
    limit: number;

    @Field(() => String, { nullable: true })
    search?: string;

    @Field(() => ShowGenre, { nullable: true })
    genre?: ShowGenre;

    @Field(() => ShowType, { nullable: true })
    type?: ShowType;

    @Field(() => ShowSortBy, { nullable: true })
    sortBy?: ShowSortBy;

    @Field(() => String, { nullable: true, defaultValue: 'ASC' })
    sortOrder?: 'ASC' | 'DESC';
}
