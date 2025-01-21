import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { ColocationEntity } from "./colocation.entity";

@Entity("charges")
export class ChargeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  type: string;

  @Column("float")
  amount: number;

  @ManyToOne(() => UserEntity)
  payer: UserEntity;

  @ManyToOne(() => ColocationEntity)
  colocation: ColocationEntity;

  @Column("date")
  date: Date;

  @Column({ default: false })
  payed: boolean;
}
