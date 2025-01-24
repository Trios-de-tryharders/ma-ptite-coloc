import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";

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

  @ManyToOne(() => UserEntity, user => user.ownedColocations)
  owner: UserEntity;

  @ManyToMany(() => UserEntity, user => user.colocations)
  roommates: UserEntity[];

  @ManyToOne(() => UserEntity, { nullable: true })
  chief?: UserEntity;
}
