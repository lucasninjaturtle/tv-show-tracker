import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episode } from './entities/episode.entity';
import { Show } from 'src/shows/entities/show.entity';
import { EpisodesService } from './episode.service';
import { EpisodesResolver } from './episode.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Episode, Show])],
  providers: [EpisodesService, EpisodesResolver],
})
export class EpisodesModule { }
