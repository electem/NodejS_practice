import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Reservation } from "./reservation.entity";

@Entity()
export class Guest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column("json")
  address: object;

  @Column({ nullable: true })
  booking_date: string;

  @ManyToOne(() => Reservation, reservation => reservation.guest_details)
  reservation: Reservation;
}
