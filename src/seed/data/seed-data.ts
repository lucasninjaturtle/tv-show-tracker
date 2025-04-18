// src/seed/data/seed-data.ts

import { ShowGenre, ShowType } from "src/common/enums/show.enums";

export const SEED_USERS = [
    { fullName: 'John Doe', email: 'john@example.com', password: '123456' },
    { fullName: 'Jane Smith', email: 'jane@example.com', password: '123456' },
    { fullName: 'Carlos García', email: 'carlos@example.com', password: '123456' },
    { fullName: 'Emily Johnson', email: 'emily@example.com', password: '123456' },
    { fullName: 'Akira Tanaka', email: 'akira@example.com', password: '123456' },
];

export const SEED_SHOWS = [
    {
        title: 'Breaking Bad',
        description: 'A chemistry teacher becomes a drug dealer',
        genre: ShowGenre.DRAMA,
        type: ShowType.SERIES,
        releaseDate: new Date('2008-01-20'),
        imageUrl: 'https://example.com/breaking-bad.jpg',
        isActive: true
    },
    {
        title: 'Stranger Things',
        description: 'Kids fight supernatural forces in the 80s',
        genre: ShowGenre.SCI_FI,
        type: ShowType.SERIES,
        releaseDate: new Date('2016-07-15'),
        imageUrl: 'https://example.com/stranger-things.jpg',
        isActive: true
    },
    {
        title: 'Inception',
        description: 'A thief who steals corporate secrets through dreams',
        genre: ShowGenre.SCI_FI,
        type: ShowType.MOVIE,
        releaseDate: new Date('2010-07-16'),
        imageUrl: 'https://example.com/inception.jpg',
        isActive: true
    },
    {
        title: 'Friends',
        description: 'Six friends living in New York',
        genre: ShowGenre.DRAMA,
        type: ShowType.SERIES,
        releaseDate: new Date('1994-09-22'),
        imageUrl: 'https://example.com/friends.jpg',
        isActive: true
    },
    {
        title: 'Interstellar',
        description: 'A team travels through a wormhole to find a new home',
        genre: ShowGenre.DOCUMENTARY,
        type: ShowType.MOVIE,
        releaseDate: new Date('2014-11-07'),
        imageUrl: 'https://example.com/interstellar.jpg',
        isActive: true
    },
];

export const SEED_EPISODES = [
    {
        title: 'Pilot',
        season: 1,
        episodeNumber: 1,
        releaseDate: new Date('2008-01-20'),
        showTitle: 'Breaking Bad',
        synopsis: 'Walter White begins his journey as a meth manufacturer after being diagnosed with terminal cancer.'
    },
    {
        title: 'The Upside Down',
        season: 1,
        episodeNumber: 8,
        releaseDate: new Date('2016-07-15'),
        showTitle: 'Stranger Things',
        synopsis: 'The group attempts to rescue Will from the Upside Down while facing the Demogorgon.'
    },
    {
        title: 'The One Where It All Began',
        season: 1,
        episodeNumber: 1,
        releaseDate: new Date('1994-09-22'),
        showTitle: 'Friends',
        synopsis: 'Rachel joins the group after leaving her fiancé at the altar, and Monica goes on a date.'
    },
    {
        title: 'Dream Collapse',
        season: 1,
        episodeNumber: 1,
        releaseDate: new Date('2010-07-16'),
        showTitle: 'Inception',
        synopsis: 'Dom Cobb leads a team into a complex dream within a dream to perform a mental heist.'
    },
    {
        title: 'The Wormhole',
        season: 1,
        episodeNumber: 1,
        releaseDate: new Date('2014-11-07'),
        showTitle: 'Interstellar',
        synopsis: 'A team of astronauts travels through a wormhole in search of a new home for humanity.'
    }
];


export const SEED_ACTORS = [
    {
        name: 'Bryan Cranston',
        showTitles: ['Breaking Bad'],
    },
    {
        name: 'Millie Bobby Brown',
        showTitles: ['Stranger Things'],
    },
    {
        name: 'Jennifer Aniston',
        showTitles: ['Friends'],
    },
    {
        name: 'Leonardo DiCaprio',
        showTitles: ['Inception'],
    },
    {
        name: 'Matthew McConaughey',
        showTitles: ['Interstellar'],
    },
];
