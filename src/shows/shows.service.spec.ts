import { Test, TestingModule } from '@nestjs/testing';
import { ShowsService } from './shows.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Show } from './entities/show.entity';
import { Actor } from 'src/actor/entities/actor.entity';
import { Episode } from 'src/episode/entities/episode.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const mockShowRepository = () => ({
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    preload: jest.fn(),
    remove: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([]),
    })),
});

const mockActorRepository = () => ({
    findBy: jest.fn(),
});

const mockEpisodeRepository = () => ({});

describe('ShowsService', () => {
    let service: ShowsService;
    let showRepo: jest.Mocked<Repository<Show>>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ShowsService,
                { provide: getRepositoryToken(Show), useFactory: mockShowRepository },
                { provide: getRepositoryToken(Actor), useFactory: mockActorRepository },
                { provide: getRepositoryToken(Episode), useFactory: mockEpisodeRepository },
            ],
        }).compile();

        service = module.get<ShowsService>(ShowsService);
        showRepo = module.get(getRepositoryToken(Show));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create()', () => {
        it('should create and save a show', async () => {
            const input = { title: 'Test Show' } as any;
            const saved = { id: '1', ...input };

            showRepo.create.mockReturnValue(input);
            showRepo.save.mockResolvedValue(saved);

            const result = await service.create(input);
            expect(result).toEqual(saved);
            expect(showRepo.create).toHaveBeenCalledWith(input);
            expect(showRepo.save).toHaveBeenCalledWith(input);
        });
    });

    describe('findOne()', () => {
        it('should return a show if found', async () => {
            const show = { id: '1', title: 'Show' } as Show;
            showRepo.findOne.mockResolvedValue(show);

            const result = await service.findOne('1');
            expect(result).toEqual(show);
        });

        it('should throw NotFoundException if not found', async () => {
            showRepo.findOne.mockResolvedValue(null);

            await expect(service.findOne('not-found')).rejects.toThrow(NotFoundException);
        });
    });

    describe('remove()', () => {
        it('should remove and return the show', async () => {
            const show = { id: '1', title: 'Test' } as Show;
            jest.spyOn(service, 'findOne').mockResolvedValue(show);
            showRepo.remove.mockResolvedValue(show);

            const result = await service.remove('1');
            expect(result).toEqual(show);
        });
    });
});
