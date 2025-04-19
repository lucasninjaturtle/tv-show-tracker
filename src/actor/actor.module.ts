import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Actor } from './entities/actor.entity';
import { ActorsResolver } from './actor.resolver';
import { ActorsService } from './actor.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Actor]) // <-- esto es clave
  ],
  providers: [ActorsResolver, ActorsService],
  exports: [ActorsService], // opcional, si lo usás en otros módulos
})
export class ActorModule { }
