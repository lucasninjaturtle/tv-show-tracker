import { ShowGenre, ShowType } from 'src/common/enums/show.enums';

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
        isActive: true,
    },
    {
        title: 'Stranger Things',
        description: 'Kids fight supernatural forces in the 80s',
        genre: ShowGenre.SCI_FI,
        type: ShowType.SERIES,
        releaseDate: new Date('2016-07-15'),
        imageUrl: 'https://example.com/stranger-things.jpg',
        isActive: true,
    },
    {
        title: 'Friends',
        description: 'Six friends living in New York',
        genre: ShowGenre.DRAMA,
        type: ShowType.SERIES,
        releaseDate: new Date('1994-09-22'),
        imageUrl: 'https://example.com/friends.jpg',
        isActive: true,
    },
    {
        title: 'The Office',
        description: 'A mockumentary about office life',
        genre: ShowGenre.COMEDY,
        type: ShowType.SERIES,
        releaseDate: new Date('2005-03-24'),
        imageUrl: 'https://example.com/the-office.jpg',
        isActive: true,
    },
    {
        title: 'The Mandalorian',
        description: 'A lone bounty hunter in the outer reaches of the galaxy',
        genre: ShowGenre.SCI_FI,
        type: ShowType.SERIES,
        releaseDate: new Date('2019-11-12'),
        imageUrl: 'https://example.com/mandalorian.jpg',
        isActive: true,
    },
    {
        title: 'Game of Thrones',
        description: 'Nine noble families fight for control over Westeros',
        genre: ShowGenre.DRAMA,
        type: ShowType.SERIES,
        releaseDate: new Date('2011-04-17'),
        imageUrl: 'https://example.com/got.jpg',
        isActive: true,
    },
    {
        title: 'Seinfeld',
        description: 'A show about nothing and everything',
        genre: ShowGenre.COMEDY,
        type: ShowType.SERIES,
        releaseDate: new Date('1989-07-05'),
        imageUrl: 'https://example.com/seinfeld.jpg',
        isActive: true,
    },
    {
        title: 'The Lord of the Rings: The Rings of Power',
        description: 'Epic prequel to the beloved trilogy',
        genre: ShowGenre.DRAMA,
        type: ShowType.SERIES,
        releaseDate: new Date('2022-09-02'),
        imageUrl: 'https://example.com/lotr-rings.jpg',
        isActive: true,
    },
    {
        title: 'Inception',
        description: 'A thief who steals secrets through dreams',
        genre: ShowGenre.SCI_FI,
        type: ShowType.MOVIE,
        releaseDate: new Date('2010-07-16'),
        imageUrl: 'https://example.com/inception.jpg',
        isActive: true,
    },
    {
        title: 'Interstellar',
        description: 'A team travels through a wormhole to save humanity',
        genre: ShowGenre.SCI_FI,
        type: ShowType.MOVIE,
        releaseDate: new Date('2014-11-07'),
        imageUrl: 'https://example.com/interstellar.jpg',
        isActive: true,
    },
    // Agrega 20 más con nombres inventados o conocidos
    ...Array.from({ length: 20 }).map((_, i) => ({
        title: `Generic Show ${i + 1}`,
        description: `Description of Generic Show ${i + 1}`,
        genre: Object.values(ShowGenre)[i % Object.values(ShowGenre).length],
        type: i % 2 === 0 ? ShowType.MOVIE : ShowType.SERIES,
        releaseDate: new Date(`2022-01-${(i % 28) + 1}`),
        imageUrl: `https://example.com/generic-show-${i + 1}.jpg`,
        isActive: true,
    })),
];

export const SEED_EPISODES = SEED_SHOWS.slice(0, 30).map((show, i) => ({
    title: `Episode ${i + 1}`,
    season: 1,
    episodeNumber: 1,
    releaseDate: show.releaseDate,
    showTitle: show.title,
    synopsis: `First episode of ${show.title}, an exciting start.`,
}));

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
        name: 'Steve Carell',
        showTitles: ['The Office'],
    },
    {
        name: 'Pedro Pascal',
        showTitles: ['The Mandalorian'],
    },
    {
        name: 'Emilia Clarke',
        showTitles: ['Game of Thrones'],
    },
    {
        name: 'Jerry Seinfeld',
        showTitles: ['Seinfeld'],
    },
    {
        name: 'Elijah Wood',
        showTitles: ['The Lord of the Rings: The Rings of Power'],
    },
    {
        name: 'Leonardo DiCaprio',
        showTitles: ['Inception'],
    },
    {
        name: 'Matthew McConaughey',
        showTitles: ['Interstellar'],
    },
    ...Array.from({ length: 5 }).map((_, i) => ({
        name: `Actor ${i + 1}`,
        showTitles: [`Generic Show ${i + 1}`],
    })),
];
