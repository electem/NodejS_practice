// src/post/post.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  content?: string;

  @ManyToOne(() => User, user => user.posts, { onDelete: 'CASCADE' })
  user: User;
}
