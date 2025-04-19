import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Show } from 'src/shows/entities/show.entity';
import { PaginationArgs } from 'src/common/dto/args/pagination.ars';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @Query(() => [User], { name: 'users' })
  findAll(
    @Args() paginationArgs: PaginationArgs,
  ): Promise<User[]> {
    return this.usersService.findAll(paginationArgs);
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => ID }) id: string
  ): Promise<User> {
    //todo:
    throw new Error('No implementado');
    // return this.usersService.findOne(id);
  }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.usersService.update(updateUserInput.id, updateUserInput);
  // }

  @Mutation(() => User)
  blockUser(@Args('id', { type: () => ID }) id: string
  ): Promise<User> {
    return this.usersService.block(id);
  }


  @Mutation(() => User)
  addFavoriteShow(
    @CurrentUser() userId: User,
    @Args('showId', { type: () => ID }) showId: string,
  ): Promise<User> {
    return this.usersService.addFavoriteShow(userId, showId);
  }

  @Query(() => [Show], { name: 'favoriteShows' })
  @UseGuards(JwtAuthGuard)
  async getFavoriteShows(
    @CurrentUser() user: User,
  ): Promise<Show[]> {
    return this.usersService.getFavoriteShows(user.id);
  }

  @Query(() => User, { name: 'me' })
  @UseGuards(JwtAuthGuard)
  getMyData(@CurrentUser() user: User): Promise<User> {
    return this.usersService.findOneWithAllData(user.id);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteMyAccount(@CurrentUser() user: User): Promise<boolean> {
    return this.usersService.deleteAccount(user.id);
  }

  @Query(() => String)
  @UseGuards(JwtAuthGuard)
  async exportMyData(
    @CurrentUser() user: User,
  ): Promise<string> {
    return this.usersService.exportUserData(user.id);
  }



}
