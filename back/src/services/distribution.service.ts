import { DistributionEntity } from "../databases/mysql/distribution.entity";
import { ChargeRepository } from "../repositories/charge.repository";
import { DistributionRepository } from "../repositories/distribution.repository";
import { DistributionToCreateDTO, SearchDistributionCriteriaDTO } from "../types/distribution/dtos";
import AppError from "../utils/appError";

export class DistributionService {
  private distributionRepository: DistributionRepository;
  private chargeRepository: ChargeRepository;

  constructor() {
    this.distributionRepository = new DistributionRepository();
    this.chargeRepository = new ChargeRepository();
  }

  async createDistribution(distributionData: DistributionToCreateDTO, userId: number): Promise<DistributionEntity> {
    const charge = await this.distributionRepository.findChargeById(distributionData.charge.id);
    if (!charge) {
      throw new AppError(404, "Charge not found");
    }

    if (charge.payed) {
      throw new AppError(400, "You can't add a distribution to a charge that has already been payed");
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

    if (distributionData.amount + charge.distributions.reduce((acc, distribution) => acc + distribution.amount, 0) === charge.amount) {
      charge.payed = true;
    }

    const distribution = this.distributionRepository.create(distributionData);

    const savedDistribution = await this.distributionRepository.save(distribution);
    await this.chargeRepository.save(charge);

    return savedDistribution;
  }

  async getDistributionById(id: number): Promise<DistributionEntity | null> {
    return this.distributionRepository.findOneBy({ id });
  }

  async getDistributions(criteria: SearchDistributionCriteriaDTO): Promise<DistributionEntity[]> {
    return this.distributionRepository.findBy(criteria);
  }

  async updateDistribution(id: number, distributionData: Partial<DistributionEntity>): Promise<void> {
    const distribution = await this.getDistributionById(id);

    if (!distribution) {
      throw new AppError(404, "Distribution not found");
    }

    if (distributionData.charge) {
      throw new AppError(400, "You can't change a distribution's charge");
    }

    if (distributionData.user) {
      throw new AppError(400, "You can't change a distribution's user");
    }

    if (distributionData.amount && distributionData.amount < 0) {
      throw new AppError(400, "You can't set a negative amount for a distribution");
    }

    if (distributionData.amount && distributionData.amount + distribution.charge.distributions.reduce((acc, distri) => distribution.id !== distri.id ? acc + distri.amount : acc + 0, 0) > distribution.charge.amount) {
      throw new AppError(400, "You can't distribute more than the charge amount");
    }

    if (distributionData.amount && distributionData.amount + distribution.charge.distributions.reduce((acc, distri) => distribution.id !== distri.id ? acc + distri.amount : acc + 0, 0) === distribution.charge.amount) {
      distribution.charge.payed = true;
    }

    if (distributionData.amount && distributionData.amount + distribution.charge.distributions.reduce((acc, distri) => distribution.id !== distri.id ? acc + distri.amount : acc + 0, 0) < distribution.charge.amount) {
      distribution.charge.payed = false;
    }

    await this.distributionRepository.update(id, distributionData);

    await this.chargeRepository.save(distribution.charge);
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
