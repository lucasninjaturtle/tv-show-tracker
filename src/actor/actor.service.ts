import { Injectable } from '@nestjs/common';
import { CreateActorInput } from './dto/create-actor.input';
import { UpdateActorInput } from './dto/update-actor.input';

@Injectable()
export class ActorService {
  create(createActorInput: CreateActorInput) {
    return 'This action adds a new actor';
  }

  findAll() {
    return `This action returns all actor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} actor`;
  }

  update(id: number, updateActorInput: UpdateActorInput) {
    return `This action updates a #${id} actor`;
  }

  remove(id: number) {
    return `This action removes a #${id} actor`;
  }
}
