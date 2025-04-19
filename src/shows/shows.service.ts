import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Show } from './entities/show.entity';
import { CreateShowInput, UpdateShowInput } from './dto/inputs';
import { User } from 'src/users/entities/user.entity';
import { FindAllShowsArgs } from 'src/common/dto/args/find-all-shows.args';
import { Actor } from 'src/actor/entities/actor.entity';
import { Episode } from 'src/episode/entities/episode.entity';

@Injectable()
export class ShowsService {
  constructor(
    @InjectRepository(Show)
    private readonly showsRepository: Repository<Show>,
    @InjectRepository(Actor)
    private readonly actorsRepository: Repository<Actor>,
    @InjectRepository(Episode)
    private readonly episodesRepository: Repository<Episode>,
  ) { }

  async create(createShowInput: CreateShowInput): Promise<Show> {
    const show = this.showsRepository.create(createShowInput);
    return this.showsRepository.save(show);
  }

  async findAll(args: FindAllShowsArgs): Promise<Show[]> {
    const { offset, limit, search, genre, type, sortBy, sortOrder } = args;

    const queryBuilder = this.showsRepository.createQueryBuilder('show')
      .leftJoinAndSelect('show.actors', 'actor')
      .leftJoinAndSelect('show.episodes', 'episode')
      .take(limit)
      .skip(offset);

    if (search) {
      queryBuilder.andWhere('LOWER(show.title) LIKE :title', {
        title: `%${search.toLowerCase()}%`,
      });
    }

    if (genre) {
      queryBuilder.andWhere('show.genre = :genre', { genre });
    }

    if (type) {
      queryBuilder.andWhere('show.type = :type', { type });
    }

    if (sortBy) {
      queryBuilder.orderBy(`show.${sortBy}`, sortOrder ?? 'ASC');
    }

    return queryBuilder.getMany();
  }

  async findOne(id: string): Promise<Show> {
    const show = await this.showsRepository.findOne({
      where: { id },
      relations: ['actors', 'episodes'],
    });

    if (!show) throw new NotFoundException(`Show #${id} not found`);
    return show;
  }

  async update(id: string, updateShowInput: UpdateShowInput): Promise<Show> {
    const { actorIds, ...updateData } = updateShowInput;

    const show = await this.showsRepository.preload({
      ...updateData,
      id,
    });

    if (!show) {
      throw new NotFoundException(`Show #${id} not found`);
    }

    if (actorIds?.length) {
      const actors = await this.actorsRepository.findBy({
        id: In(actorIds),
      });

      if (actors.length !== actorIds.length) {
        throw new BadRequestException('Some actorIds are invalid');
      }

      show.actors = actors;
    }

    await this.showsRepository.save(show);

    const updatedShow = await this.showsRepository.findOne({
      where: { id: show.id },
      relations: ['actors'],
    });

    if (!updatedShow) {
      throw new NotFoundException(`Show #${id} not found after update`);
    }

    return updatedShow;
  }

  async remove(id: string): Promise<Show> {
    const show = await this.findOne(id);
    await this.showsRepository.remove(show);
    return { ...show, id };
  }
}
