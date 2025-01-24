import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { ColocationEntity } from "./colocation.entity";
import { ChargeEntity } from "./charge.entity";

@Entity("distributions")
export class DistributionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ChargeEntity, charge => charge.distributions)
  charge: ChargeEntity;

  @ManyToOne(() => UserEntity, user => user.distributions)
  user: UserEntity;

  @Column("float")
  amount: number;
}
