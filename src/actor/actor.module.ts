import { Module } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorResolver } from './actor.resolver';

@Module({
  providers: [ActorResolver, ActorService]
})
export class ActorModule {}
