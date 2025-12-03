import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity()
export class RoomRate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true }) // make nullable
  room_id: string;

  @Column({ nullable: true })
  room_name: string;

  @Column({ nullable: true, type: 'int' })
  no_of_unit: number;

  @Column({ nullable: true })
  product_id: string;

  @Column({ nullable: true })
  product_name: string;

  @Column({ nullable: true, type: 'date' })
  start_date: string;

  @Column({ nullable: true, type: 'date' })
  end_date: string;

  @Column({ nullable: true, type: 'float' })
  price: number;

  @Column({ nullable: true })
  currencyCode: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true, type: 'jsonb' })
  guest_count: any;

  @ManyToOne(() => Reservation, reservation => reservation.room_rates)
  reservation: Reservation;
}
