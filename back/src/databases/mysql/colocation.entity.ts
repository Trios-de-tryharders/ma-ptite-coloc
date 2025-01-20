import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
  ownerName: string;

  @Column("text")
  description: string;
}
