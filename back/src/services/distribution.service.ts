import { DistributionEntity } from "../databases/mysql/distribution.entity";
import { DistributionRepository } from "../repositories/distribution.repository";
import { DistributionToCreateDTO, SearchDistributionCriteriaDTO } from "../types/distribution/dtos";
import AppError from "../utils/appError";
import { ChargeService } from "./charge.service";

export class DistributionService {
  private distributionRepository: DistributionRepository;
  private chargeService: ChargeService;

  constructor() {
    this.distributionRepository = new DistributionRepository();
    this.chargeService = new ChargeService();
  }

  async createDistribution(distributionData: DistributionToCreateDTO, userId: number): Promise<DistributionEntity> {
    const charge = await this.distributionRepository.findChargeById(distributionData.charge.id);
    if (!charge) {
      throw new AppError(404, "Charge not found");
    }

    const user = await this.distributionRepository.findUserById(distributionData.user.id);
    if (!user) {   
      throw new AppError(404, "User not found");
    }

    if (!charge.colocation.roommates.find(roommate => roommate.id === user.id)) {
      throw new AppError(404, "User is not in the colocation");
    }

    if (charge.distributions.length && !charge.distributions.find(distribution => distribution.user.id === user.id)) {
      throw new AppError(400, "You can't add a distribution to a user that has already payed");
    }

    if (!charge.colocation.roommates.find(roommate => roommate.id === userId) && userId !== charge.colocation.owner.id) {
      throw new AppError(403, "You can't add a distribution to the payer if you are not apart of the colocation");
    }

    if (distributionData.amount > charge.amount) {
      throw new AppError(400, "You can't distribute more than the charge amount");
    }

    if (distributionData.amount < 0) {
      throw new AppError(400, "You can't distribute a negative amount");
    }

    if (distributionData.amount + charge.distributions.reduce((acc, distribution) => acc + distribution.amount, 0) > charge.amount) {
      throw new AppError(400, "You can't distribute more than the charge amount");
    }

    const distribution = this.distributionRepository.create(distributionData);

    const savedDistribution = await this.distributionRepository.save(distribution);

    return savedDistribution;
  }

  async getDistributionById(id: number): Promise<DistributionEntity | null> {
    return this.distributionRepository.findOneBy({ id });
  }

  async getDistributions(criteria: SearchDistributionCriteriaDTO): Promise<DistributionEntity[]> {
    return this.distributionRepository.findBy(criteria);
  }

  async updateDistribution(id: number, distributionData: Partial<DistributionEntity>): Promise<void> {
    await this.doesDistributionExist(id);
    await this.distributionRepository.update(id, distributionData);
  }

  async deleteDistribution(id: number): Promise<void> {
    await this.doesDistributionExist(id);
    await this.distributionRepository.delete(id);
  }

  async doesDistributionExist(distributionId: number): Promise<boolean> {
    const distribution = await this.distributionRepository.findOneBy({ id: distributionId });
    if (!distribution) {
      throw new AppError(404, "Distribution not found");
    }
    return !!distribution;
  }
}
