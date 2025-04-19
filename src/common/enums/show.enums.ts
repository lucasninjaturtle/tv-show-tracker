import { registerEnumType } from '@nestjs/graphql';

export enum ShowGenre {
    DRAMA = 'DRAMA',
    COMEDY = 'COMEDY',
    ACTION = 'ACTION',
    SCI_FI = 'SCI_FI',
    HORROR = 'HORROR',
    ROMANCE = 'ROMANCE',
    DOCUMENTARY = 'DOCUMENTARY',
    ANIMATION = 'ANIMATION',
}

registerEnumType(ShowGenre, {
    name: 'ShowGenre',
});

export enum ShowType {
    SERIES = 'SERIES',
    MOVIE = 'MOVIE',
    MINISERIES = 'MINISERIES',
    SPECIAL = 'SPECIAL',
}

registerEnumType(ShowType, {
    name: 'ShowType',
});
