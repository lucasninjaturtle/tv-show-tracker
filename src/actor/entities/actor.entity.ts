import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Show } from 'src/shows/entities/show.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Actor {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field(() => [Show], { nullable: true })
  @ManyToMany(() => Show, show => show.actors)
  shows: Show[];
}

