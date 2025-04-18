import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actor } from './entities/actor.entity';
import { CreateActorInput } from './dto/create-actor.input';
import { UpdateActorInput } from './dto/update-actor.input';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
  ) { }

  async create(input: CreateActorInput): Promise<Actor> {
    const actor = this.actorRepository.create(input);
    return this.actorRepository.save(actor);
  }

  async findAll(): Promise<Actor[]> {
    return this.actorRepository.find({ relations: ['shows'] });
  }

  async findOne(id: string): Promise<Actor> {
    const actor = await this.actorRepository.findOne({
      where: { id },
      relations: ['shows'],
    });

    if (!actor) throw new NotFoundException(`Actor with ID ${id} not found`);

    return actor;
  }

  async update(id: string, input: UpdateActorInput): Promise<Actor> {
    if (input.id && input.id !== id) {
      throw new BadRequestException('ID mismatch between params and input');
    }

    const actor = await this.actorRepository.preload({
      ...input,
      id, // este ID va al final para sobrescribir el de input si existiera
    });

    if (!actor) throw new NotFoundException(`Actor with ID ${id} not found`);

    return this.actorRepository.save(actor);
  }


  async remove(id: string): Promise<Actor> {
    const actor = await this.findOne(id);
    await this.actorRepository.remove(actor);
    return { ...actor, id }; // confirm delete
  }
}
