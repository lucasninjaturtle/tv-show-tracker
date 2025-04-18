import { Module } from '@nestjs/common';
import { ShowsService } from './shows.service';
import { ShowsResolver } from './shows.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Show } from './entities/show.entity';

@Module({
  providers: [ShowsResolver, ShowsService],
  imports: [TypeOrmModule.forFeature([Show])],
  exports: [ShowsService],
})
export class ShowsModule { }
