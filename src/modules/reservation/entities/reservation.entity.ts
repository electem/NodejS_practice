import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Booker } from "./booker.entity";
import { Guest } from "./guest.entity";
import { RoomRate } from "./room-rate.entity";


@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  booking_id: string;

 @Column({ nullable: true })
  property_id: number;

 @Column({ nullable: true })
  check_in: string;

 @Column({ nullable: true })
  check_out: string;

 @Column({ nullable: true })
  booking_date: string;

 @Column({ nullable: true })
  guest_name: string;

 @Column({ nullable: true })
  nuiteeReservationId: string;

 @Column({ nullable: true })
  nuiteeReservationPin: string;

 @Column({ nullable: true })
  currency: string;

 @Column({ nullable: true })
  source_of_booking: string;

  @Column({ type: "float" })
  total_price: number;

 @Column({ nullable: true })
  status: string;

  @OneToOne(() => Booker, { cascade: true })
  @JoinColumn()
  booker: Booker;

  @OneToMany(() => Guest, guest => guest.reservation, { cascade: true })
  guest_details: Guest[];

  @OneToMany(() => RoomRate, rate => rate.reservation, { cascade: true })
  room_rates: RoomRate[];
}
