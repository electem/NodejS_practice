// src/profile/profile.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @OneToOne(() => User, user => user.profile, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
