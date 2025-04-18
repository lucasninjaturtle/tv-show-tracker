import { ObjectType, Field, Int, Float, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity()
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

  @Field({ nullable: true })
  @Column({ nullable: true })
  genre?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  type?: string;

  @Field(() => Float, { nullable: true })
  @Column('float', { nullable: true })
  rating?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  language?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  imageUrl?: string;

  @Field(() => Boolean)
  @Column({ default: true })
  isActive: boolean;
}
