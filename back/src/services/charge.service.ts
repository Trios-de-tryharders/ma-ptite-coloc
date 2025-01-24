import { ChargeEntity } from "../databases/mysql/charge.entity";
import { ChargeRepository } from "../repositories/charge.repository";
import { ChargeToCreateDTO, SearchChargeCriteriaDTO } from "../types/charge/dtos";
import AppError from "../utils/appError";

export class ChargeService {
  private chargeRepository: ChargeRepository;

  constructor() {
    this.chargeRepository = new ChargeRepository();
  }

  async createCharge(chargeData: ChargeToCreateDTO): Promise<ChargeEntity> {
    const payer = await this.chargeRepository.findUserById(chargeData.payer.id);
    if (!payer) {
      throw new AppError(404, "Payer not found");
    }

    const colocation = await this.chargeRepository.findColocationById(chargeData.colocation.id);
    if (!colocation) {
      throw new AppError(404, "Colocation not found");
    }
    
    chargeData.date = new Date(chargeData.date);
    const charge = this.chargeRepository.create(chargeData);

    return this.chargeRepository.save(charge);
  }

  async getChargeById(id: number): Promise<ChargeEntity | null> {
    await this.doesChargeExist(id); 
    return this.chargeRepository.findOneBy({ id });
  }

  async getCharge(criteria: SearchChargeCriteriaDTO): Promise<ChargeEntity | null> {
    return this.chargeRepository.findOneBy(criteria);
  }

  async getCharges(criteria: SearchChargeCriteriaDTO): Promise<ChargeEntity[]> {
    return this.chargeRepository.findBy(criteria);
  }

  async getAllCharges(): Promise<ChargeEntity[]> {
    return this.chargeRepository.findAll();
  }

  async updateCharge(id: number, chargeData: Partial<ChargeEntity>): Promise<void> {
    await this.doesChargeExist(id);    
    if (chargeData.date) {
      chargeData.date = new Date(chargeData.date);
    }
    await this.chargeRepository.update(id, chargeData);
  }

  async patchCharge(id: number, chargeData: Partial<ChargeEntity>): Promise<void> {
    await this.doesChargeExist(id);
    if (chargeData.date) {
      chargeData.date = new Date(chargeData.date);
    }
    await this.chargeRepository.update(id, chargeData);
  }

  async deleteCharge(id: number): Promise<void> {
    await this.doesChargeExist(id);    
    await this.chargeRepository.delete(id);
  }

  async doesChargeExist(chargeId: number): Promise<boolean> {
    const charge = await this.chargeRepository.findOneBy({ id: chargeId });
    if (!charge) {
      throw new AppError(404, "Charge not found");
    }
    return !!charge;
  }
}
