import { ObjectType, Field, Int, Float, ID } from '@nestjs/graphql';
import { Actor } from 'src/actor/entities/actor.entity';
import { ShowGenre, ShowType } from 'src/common/enums/show.enums';
import { Episode } from 'src/episode/entities/episode.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, ManyToMany } from 'typeorm';

@Entity()
@ObjectType()
export class Show {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  releaseDate?: Date;

  @Field(() => [Episode], { nullable: true })
  @OneToMany(() => Episode, episode => episode.show)
  episodes?: Episode[];

  @Field(() => [Actor], { nullable: true })
  @ManyToMany(() => Actor, actor => actor.shows, { cascade: true })
  @JoinTable()
  actors?: Actor[];

  @Field(() => ShowGenre)
  @Column({ type: 'enum', enum: ShowGenre })
  genre: ShowGenre;

  @Field(() => ShowType)
  @Column({ type: 'enum', enum: ShowType })
  type: ShowType;

  @Field({ nullable: true })
  @Column({ nullable: true })
  imageUrl?: string;

  @Field({ defaultValue: true })
  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => User, user => user.favorites)
  @Field(() => [User], { nullable: true })
  favoredBy?: User[];
}