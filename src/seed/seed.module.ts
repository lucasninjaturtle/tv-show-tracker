import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './../users/users.module';
import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';
import { ShowsModule } from 'src/shows/shows.module';
import { EpisodesModule } from 'src/episode/episode.module';
import { ActorModule } from 'src/actor/actor.module';
import { User } from 'src/users/entities/user.entity';
import { Show } from 'src/shows/entities/show.entity';
import { Episode } from 'src/episode/entities/episode.entity';
import { Actor } from 'src/actor/entities/actor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [SeedResolver, SeedService],
  imports: [
    TypeOrmModule.forFeature([User, Show, Episode, Actor]),
    ConfigModule,
    ShowsModule,
    EpisodesModule,
    UsersModule,
    ActorModule
  ]
})
export class SeedModule { }
