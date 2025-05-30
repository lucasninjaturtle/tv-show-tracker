import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, In } from 'typeorm';

import { User } from 'src/users/entities/user.entity';
import { Show } from 'src/shows/entities/show.entity';
import { Episode } from 'src/episode/entities/episode.entity';
import { Actor } from 'src/actor/entities/actor.entity';

import { UsersService } from 'src/users/users.service';
import { ShowsService } from 'src/shows/shows.service';
import { EpisodesService } from 'src/episode/episode.service';
import { ActorsService } from 'src/actor/actor.service';

import { SEED_USERS, SEED_SHOWS, SEED_EPISODES, SEED_ACTORS } from './data/seed-data';
import { SignupInput } from 'src/auth/dto/inputs';
import { CreateActorInput } from 'src/actor/dto/create-actor.input';

@Injectable()
export class SeedService {
    private isProd: boolean;

    constructor(
        private readonly configService: ConfigService,
        private readonly dataSource: DataSource,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Show)
        private readonly showRepository: Repository<Show>,
        @InjectRepository(Episode)
        private readonly episodeRepository: Repository<Episode>,
        @InjectRepository(Actor)
        private readonly actorRepository: Repository<Actor>,

        private readonly usersService: UsersService,
        private readonly showsService: ShowsService,
        private readonly episodesService: EpisodesService,
        private readonly actorsService: ActorsService
    ) {
        this.isProd = configService.get('STATE') === 'prod';
    }

    async executeSeed(): Promise<boolean> {
        if (this.isProd) {
            throw new UnauthorizedException('We cannot run SEED on Prod');
        }

        await this.clearDatabase();

        const users = await this.loadUsers();
        const shows = await this.loadShows();
        await this.loadEpisodes(shows);
        await this.loadActors(shows);
        await this.assignFavoriteShows(users, shows);

        return true;
    }

    async clearDatabase() {
        await this.dataSource.query(`
      TRUNCATE "users_favorites_show", "show_actors_actor", "episode", "actor", "show", "users"
      RESTART IDENTITY CASCADE
    `);
    }

    private async loadUsers(): Promise<User[]> {
        const users: User[] = [];

        for (const user of SEED_USERS as SignupInput[]) {
            users.push(await this.usersService.create(user));
        }

        return users;
    }

    private async loadShows(): Promise<Show[]> {
        const showInstances: Show[] = [];

        for (const show of SEED_SHOWS) {
            showInstances.push(await this.showsService.create(show));
        }

        return showInstances;
    }

    private async loadEpisodes(shows: Show[]): Promise<Episode[]> {
        const episodePromises: Promise<Episode>[] = [];

        for (const episode of SEED_EPISODES) {
            const parentShow = shows.find(show => show.title === episode.showTitle);

            if (!parentShow) continue;

            const input = {
                ...episode,
                showId: parentShow.id,
            };

            episodePromises.push(this.episodesService.create(input));
        }

        return await Promise.all(episodePromises);
    }

    private async loadActors(shows: Show[]): Promise<void> {
        const actorPromises: Promise<Actor>[] = [];

        for (const actor of SEED_ACTORS) {
            const relatedShows = shows.filter(show =>
                actor.showTitles.includes(show.title)
            );

            const input: CreateActorInput = {
                name: actor.name,
                showIds: relatedShows.map(show => show.id),
            };

            actorPromises.push(this.actorsService.create(input));
        }

        await Promise.all(actorPromises);
    }

    private async assignFavoriteShows(users: User[], shows: Show[]) {
        for (const user of users) {
            const favorites = shows.sort(() => 0.5 - Math.random()).slice(0, 5);
            user.favorites = favorites;
            await this.userRepository.save(user);
        }
    }
}
