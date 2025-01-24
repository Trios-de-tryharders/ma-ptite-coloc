import { Repository } from "typeorm";
import { ColocationEntity } from "../databases/mysql/colocation.entity";
import { connectMySQLDB } from "../configs/databases/mysql.config";
import { ColocationToCreateDTO, SearchColocationCriteriaDTO } from "../types/colocation/dtos";
import { UserEntity } from "../databases/mysql/user.entity";

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
    criteria = { ...criteria, isActive: criteria.isActive ?? true };
    return this.colocationDB.findOne({ where: criteria, relations: ["roommates", "owner", "chief"] });
  }

  async findBy(criteria: SearchColocationCriteriaDTO): Promise<ColocationEntity[]> {
    criteria = { ...criteria, isActive: criteria.isActive ?? true };

    return this.colocationDB.find({ where: criteria, relations: ["roommates", "owner", "chief"] });
  }

  async findAll(): Promise<ColocationEntity[]> {
    
    return this.colocationDB.find({ relations: ["roommates", "owner", "chief"] });
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

  async findUserById(userId: number): Promise<UserEntity | null> {
    return this.colocationDB.manager.findOne(UserEntity, { where: { id: userId }, relations: ["ownedColocations", "distributions"] });
  }

}
