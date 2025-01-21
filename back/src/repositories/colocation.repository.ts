import { Repository } from "typeorm";
import { ColocationEntity } from "../databases/mysql/colocation.entity";
import { connectMySQLDB } from "../configs/databases/mysql.config";
import { ColocationToCreateDTO, SearchColocationCriteriaDTO } from "../types/colocation/dtos";

export class ColocationRepository {
  private colocationDB: Repository<ColocationEntity>;

  constructor() {
    this.colocationDB = connectMySQLDB.getRepository(ColocationEntity);
  }

  create(colocation: Partial<ColocationEntity>): ColocationEntity {
    const newColocation = this.colocationDB.create(colocation);
    return newColocation;
  }

  async findOneBy(criteria: SearchColocationCriteriaDTO): Promise<ColocationEntity | null> {
    return this.colocationDB.findOne({ where: criteria, relations: ["roommates"] });
  }

  async findBy(criteria: SearchColocationCriteriaDTO): Promise<ColocationEntity[]> {
    return this.colocationDB.find({ where: criteria, relations: ["roommates"] });
  }

  async findAll(): Promise<ColocationEntity[]> {
    return this.colocationDB.find({ relations: ["roommates"] });
  }

  async delete(id: number): Promise<void> {
    await this.colocationDB.delete(id);
  }

  async save(colocation: ColocationEntity): Promise<ColocationEntity> {
    return this.colocationDB.save(colocation);
  }

  async update(id: number, colocationToUpdate: Partial<ColocationEntity>): Promise<void> {
    await this.colocationDB.update(id, colocationToUpdate);
  }

  async replace(id: number, colocationToReplace: ColocationToCreateDTO): Promise<void> {
    await this.colocationDB.save({ ...colocationToReplace, id });
  }
}
