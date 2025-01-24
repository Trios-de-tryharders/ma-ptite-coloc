import { Repository } from "typeorm";
import { DistributionEntity } from "../databases/mysql/distribution.entity";
import { connectMySQLDB } from "../configs/databases/mysql.config";
import { DistributionToCreateDTO, SearchDistributionCriteriaDTO } from "../types/distribution/dtos";
import { UserEntity } from "../databases/mysql/user.entity";
import { ChargeEntity } from "../databases/mysql/charge.entity";

export class DistributionRepository {
  private distributionDB: Repository<DistributionEntity>;

  constructor() {
    this.distributionDB = connectMySQLDB.getRepository(DistributionEntity);
  }

  create(distribution: Partial<DistributionEntity>): DistributionEntity {
    const newDistribution = this.distributionDB.create(distribution);
    return newDistribution;
  }

  async findOneBy(criteria: SearchDistributionCriteriaDTO): Promise<DistributionEntity | null> {
    return this.distributionDB.findOne({ where: criteria, relations: ["charge", "user", "charge.distributions"] });
  }

  async findBy(criteria: SearchDistributionCriteriaDTO): Promise<DistributionEntity[]> {
    return this.distributionDB.find({ where: criteria, relations: ["charge", "user", "charge.distributions"] });
  }

  async delete(id: number): Promise<void> {
    await this.distributionDB.delete(id);
  }

  async save(distribution: DistributionEntity): Promise<DistributionEntity> {
    return this.distributionDB.save(distribution);
  }

  async update(id: number, distributionToUpdate: Partial<DistributionEntity>): Promise<void> {
    await this.distributionDB.update(id, distributionToUpdate);
  }

  async findChargeById(chargeId: number): Promise<ChargeEntity | null> {
    return this.distributionDB.manager.findOne(ChargeEntity, { where: { id: chargeId }, relations: ["colocation", "colocation.roommates", "colocation.owner", "distributions", "distributions.user"] });
  }

  async findUserById(userId: number): Promise<UserEntity | null> {
    return this.distributionDB.manager.findOne(UserEntity, { where: { id: userId } });
  }
}
