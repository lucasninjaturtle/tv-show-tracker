import { registerEnumType } from '@nestjs/graphql';

export enum ShowSortBy {
    TITLE = 'title',
    RELEASE_DATE = 'releaseDate',
    GENRE = 'genre',
    TYPE = 'type',
}

registerEnumType(ShowSortBy, {
    name: 'ShowSortBy',
});
