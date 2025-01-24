import { Repository } from "typeorm";
import { ChargeEntity } from "../databases/mysql/charge.entity";
import { connectMySQLDB } from "../configs/databases/mysql.config";
import { ChargeToCreateDTO, SearchChargeCriteriaDTO } from "../types/charge/dtos";
import { UserEntity } from "../databases/mysql/user.entity";
import { ColocationEntity } from "../databases/mysql/colocation.entity";

export class ChargeRepository {
  private chargeDB: Repository<ChargeEntity>;

  constructor() {
    this.chargeDB = connectMySQLDB.getRepository(ChargeEntity);
  }

  create(charge: Partial<ChargeEntity>): ChargeEntity {
    const newCharge = this.chargeDB.create(charge);
    return newCharge;
  }

  async findOneBy(criteria: SearchChargeCriteriaDTO): Promise<ChargeEntity | null> {
    return this.chargeDB.findOne({ where: criteria, relations: ["payer", "colocation", "distributions", "distributions.user"] });
  }

  async findBy(criteria: SearchChargeCriteriaDTO): Promise<ChargeEntity[]> {
    return this.chargeDB.find({ where: criteria, relations: ["payer", "colocation", "distributions",  "distributions.user"] });
  }

  async findAll(): Promise<ChargeEntity[]> {
    return this.chargeDB.find({ relations: ["payer", "colocation", "distributions",  "distributions.user"] });
  }

  async delete(id: number): Promise<void> {
    await this.chargeDB.delete(id);
  }

  async save(charge: ChargeEntity): Promise<ChargeEntity> {
    return this.chargeDB.save(charge);
  }

  async update(id: number, chargeToUpdate: Partial<ChargeEntity>): Promise<void> {
    await this.chargeDB.update(id, chargeToUpdate);
  }

  async replace(id: number, chargeToReplace: ChargeToCreateDTO): Promise<void> {
    await this.chargeDB.save({ ...chargeToReplace, id });
  }

  async findUserById(userId: number): Promise<UserEntity | null> {
    return this.chargeDB.manager.findOne(UserEntity, { where: { id: userId } });
  }

  async findColocationById(colocationId: number): Promise<ColocationEntity | null> {
    return this.chargeDB.manager.findOne(ColocationEntity, { where: { id: colocationId } });
  }
}
