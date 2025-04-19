import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Episode } from './entities/episode.entity';
import { CreateEpisodeInput } from './dto/create-episode.input';
import { UpdateEpisodeInput } from './dto/update-episode.input';
import { Show } from 'src/shows/entities/show.entity';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectRepository(Episode)
    private readonly episodeRepository: Repository<Episode>,

    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
  ) { }

  async create(input: CreateEpisodeInput): Promise<Episode> {
    const show = await this.showRepository.findOneBy({ id: input.showId });
    if (!show) throw new NotFoundException(`Show with ID ${input.showId} not found`);

    const episode = this.episodeRepository.create({
      ...input,
      show,
    });

    return this.episodeRepository.save(episode);
  }

  findAll(): Promise<Episode[]> {
    return this.episodeRepository.find({ relations: ['show'] });
  }

  async findOne(id: string): Promise<Episode> {
    const episode = await this.episodeRepository.findOne({ where: { id }, relations: ['show'] });
    if (!episode) throw new NotFoundException(`Episode with ID ${id} not found`);
    return episode;
  }

  async update(id: string, input: UpdateEpisodeInput): Promise<Episode> {
    const episode = await this.episodeRepository.preload({
      id,
      ...input,
    });

    if (!episode) throw new NotFoundException(`Episode with ID ${id} not found`);

    return this.episodeRepository.save(episode);
  }

  async remove(id: string): Promise<Episode> {
    const episode = await this.findOne(id);
    await this.episodeRepository.remove(episode);
    return { ...episode, id };
  }
}
