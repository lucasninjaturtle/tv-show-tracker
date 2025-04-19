import { Module } from '@nestjs/common';
import { ShowsService } from './shows.service';
import { ShowsResolver } from './shows.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Show } from './entities/show.entity';
import { Actor } from 'src/actor/entities/actor.entity';
import { Episode } from 'src/episode/entities/episode.entity';

@Module({
  providers: [ShowsResolver, ShowsService],
  imports: [TypeOrmModule.forFeature([Show, Actor, Episode])],
  exports: [ShowsService],
})
export class ShowsModule { }
