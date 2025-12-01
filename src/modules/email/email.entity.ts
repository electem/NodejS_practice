// src/modules/email/email.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum EmailStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  FAILED = 'FAILED',
}

@Entity('emails')
export class Email {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  to: string;

  @Column()
  subject: string;

  @Column('text')
  body: string; // template replaced with payload

  @Column({
    type: 'enum',
    enum: EmailStatus,
    default: EmailStatus.PENDING,
  })
  status: EmailStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
