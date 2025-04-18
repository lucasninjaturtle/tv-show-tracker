import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Show } from './entities/show.entity';
import { CreateShowInput, UpdateShowInput } from './dto/inputs';

@Injectable()
export class ShowsService {
  constructor(
    @InjectRepository(Show)
    private readonly showsRepository: Repository<Show>,
  ) { }

  async create(createShowInput: CreateShowInput): Promise<Show> {
    const show = this.showsRepository.create(createShowInput);
    return this.showsRepository.save(show);
  }

  async findAll(): Promise<Show[]> {
    return this.showsRepository.find();
  }

  async findOne(id: string): Promise<Show> {
    const show = await this.showsRepository.findOneBy({ id });
    if (!show) throw new NotFoundException(`Show #${id} not found`);
    return show;
  }

  async update(id: string, updateShowInput: UpdateShowInput): Promise<Show> {
    if (updateShowInput.id && updateShowInput.id !== id) {
      throw new BadRequestException('ID mismatch between params and input');
    }

    const show = await this.showsRepository.preload({
      ...updateShowInput,
      id,
    });

    if (!show) throw new NotFoundException(`Show #${id} not found`);

    await this.showsRepository.save(show);
    return show;
  }

  async remove(id: string): Promise<Show> {
    // TODO: soft delete, integridad referencial
    const show = await this.findOne(id);

    await this.showsRepository.remove(show);
    return { ...show, id };
  }

}
