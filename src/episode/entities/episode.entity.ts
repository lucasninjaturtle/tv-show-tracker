import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Show } from 'src/shows/entities/show.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Episode {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  synopsis?: string;

  @Field(() => Int)
  @Column()
  season: number;

  @Field(() => Int)
  @Column()
  episodeNumber: number;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  releaseDate?: Date;

  @ManyToOne(() => Show, show => show.episodes)
  @Field(() => Show)
  show: Show;
}
