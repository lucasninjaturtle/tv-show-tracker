import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

import { ShowsModule } from './shows/shows.module';
import { ActorModule } from './actor/actor.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EpisodesModule } from './episode/episode.module';
import { SeedModule } from './seed/seed.module';

import { CacheModule } from '@nestjs/cache-manager';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 60 * 60, // 1 hr
    }),
    ConfigModule.forRoot(),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // debug: false,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault],
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT || 5499),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      autoLoadEntities: true,
    }),
    ShowsModule,
    ActorModule,
    EpisodesModule,
    UsersModule,
    AuthModule,
    SeedModule,
    CommonModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
