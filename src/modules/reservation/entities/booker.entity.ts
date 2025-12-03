import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Booker {
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
}
