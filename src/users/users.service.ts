import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { unparse } from 'papaparse';

import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { SignupInput } from '../auth/dto/inputs/signup.input';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Show } from 'src/shows/entities/show.entity';
import { PaginationArgs } from 'src/common/dto/args/pagination.ars';

@Injectable()
export class UsersService {
  private logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Show)
    private readonly showsRepository: Repository<Show>,
  ) { }

  async create(signupInput: SignupInput): Promise<User | never> {
    try {
      const newUser: User = this.usersRepository.create({
        ...signupInput,
        password: bcrypt.hashSync(signupInput.password, 10),
      });

      return await this.usersRepository.save(newUser);
    } catch (error) {
      this.handleDBErrors(error); // lanza excepción
    }
  }


  async findAll({ offset, limit }: PaginationArgs): Promise<User[]> {
    return this.usersRepository.find({
      skip: offset,
      take: limit,
      order: {
        fullName: 'ASC', // Podés cambiar el campo y orden si querés
      },
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.usersRepository.findOneByOrFail({ email });
    } catch (error) {
      throw new NotFoundException(`${email} not found`);
    }
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['favorites'],
    });

    if (!user) {
      throw new NotFoundException(`${id} not found`);
    }

    return user;
  }


  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  block(id: string): Promise<User> {
    throw new Error(`block method not implemented`);
  }

  async addFavorite(userId: string, showId: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    const show = await this.showsRepository.findOneBy({ id: showId });

    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);
    if (!show) throw new NotFoundException(`Show with ID ${showId} not found`);

    if (!user?.favorites?.find(fav => fav.id === showId)) {
      user?.favorites?.push(show);
    }

    return this.usersRepository.save(user);
  }


  async removeFavorite(userId: string, showId: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);

    user.favorites = user?.favorites?.filter(show => show.id !== showId);

    return this.usersRepository.save(user);
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail.replace('Key', ''));
    }

    if (error.code == 'error-001') {
      throw new BadRequestException(error.detail.replace('Key', ''));
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Please check server logs');
  }


  async addFavoriteShow(userId: User, showId: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId.id },
      relations: ['favorites'],
    });

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const show = await this.showsRepository.findOneBy({ id: showId });

    if (!show) {
      throw new NotFoundException(`Show with id ${showId} not found`);
    }

    user.favorites = user.favorites ?? [];

    const alreadyFav = user.favorites.some(s => s.id === show.id);
    if (!alreadyFav) {
      user.favorites.push(show);
    }

    return this.usersRepository.save(user);
  }

  async getFavoriteShows(userId: string): Promise<Show[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);
    return user.favorites ?? [];
  }

  async findOneWithAllData(userId: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async deleteAccount(userId: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    // Opcional: eliminar relaciones (ej. favoritos)
    await this.usersRepository
      .createQueryBuilder()
      .relation(User, 'favorites')
      .of(userId)
      .remove(await this.getFavoriteShows(userId));

    await this.usersRepository.delete(userId);
    return true;
  }

  async exportUserData(userId: string): Promise<string> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    if (!user) throw new NotFoundException('User not found');

    const userData = [
      {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        roles: user.roles.join(', '),
        isActive: user.isActive,
        favorites: user.favorites?.map(show => show.title).join(', ') || 'None',
      }
    ];

    const csv = unparse(userData); // 👈 ESTE es el bueno

    return csv;
  }


}
