import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { Show } from 'src/shows/entities/show.entity';

@Module({
  providers: [
    UsersResolver,
    UsersService
  ],
  imports: [
    TypeOrmModule.forFeature([User, Show])
  ],
  exports: [
    // TypeOrmModule,
    UsersService
  ]
})
export class UsersModule { }
