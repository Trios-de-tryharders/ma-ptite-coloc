import { ChargeEntity } from "../databases/mysql/charge.entity";
import { ChargeRepository } from "../repositories/charge.repository";
import { ChargeToCreateDTO, SearchChargeCriteriaDTO } from "../types/charge/dtos";

export class ChargeService {
  private chargeRepository: ChargeRepository;

  constructor() {
    this.chargeRepository = new ChargeRepository();
  }

  async createCharge(chargeData: Partial<ChargeEntity>): Promise<ChargeEntity> {
    const charge = this.chargeRepository.create(chargeData);
    return this.chargeRepository.save(charge);
  }

  async getChargeById(id: number): Promise<ChargeEntity | null> {
    return this.chargeRepository.findOneBy({ id });
  }

  async getCharges(criteria: SearchChargeCriteriaDTO): Promise<ChargeEntity[]> {
    return this.chargeRepository.findBy(criteria);
  }

  async getAllCharges(): Promise<ChargeEntity[]> {
    return this.chargeRepository.findAll();
  }

  async updateCharge(id: number, chargeData: Partial<ChargeEntity>): Promise<void> {
    await this.chargeRepository.update(id, chargeData);
  }

  async deleteCharge(id: number): Promise<void> {
    await this.chargeRepository.delete(id);
  }
}
