import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, OneToMany } from "typeorm";
import { UserEntity } from "./user.entity";
import { ChargeEntity } from "./charge.entity";

@Entity("colocations")
export class ColocationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  location: string;

  @Column("float")
  area: number;

  @Column("int")
  numberOfRooms: number;

  @Column({ length: 100 })
  name: string;

  @Column("text")
  description: string;

  @Column("boolean", { default: true })
  isActive: boolean;

  @ManyToOne(() => UserEntity, user => user.ownedColocations)
  owner: UserEntity;

  @ManyToMany(() => UserEntity, user => user.colocations)
  roommates: UserEntity[];

  @ManyToOne(() => UserEntity, { nullable: true })
  chief?: UserEntity;

  @OneToMany(() => ChargeEntity, charge => charge.colocation)
  charges: ChargeEntity[];
}
