import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { ColocationEntity } from "./colocation.entity";
import { DistributionEntity } from "./distribution.entity";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  firstname: string;

  @Column({ length: 100 })
  lastname: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  password_hash: string; // grosse faille de sécurité -> à ne pas faire en prod -> A mettre dans une autre table avec une relation

  @Column("int")
  age: number;

  @Column({ default: false })
  isAdmin?: boolean;

  @Column("boolean", { default: true })
  isActive: boolean;

  @OneToMany(() => ColocationEntity, colocation => colocation.owner)
  ownedColocations: ColocationEntity[];

  @ManyToMany(() => ColocationEntity, colocation => colocation.roommates)
  @JoinTable()
  colocations: ColocationEntity[];

  @OneToMany(() => DistributionEntity, distribution => distribution.user)
  distributions: DistributionEntity[];
}
