import { ColocationEntity } from "../databases/mysql/colocation.entity";
import { ColocationRepository } from "../repositories/colocation.repository";
import { ColocationToCreateDTO, ColocationToModifyDTO } from "../types/colocation/dtos";
import AppError from "../utils/appError";

export class ColocationService {
  private colocationRepository = new ColocationRepository();

  async registerColocation(colocationToCreate: ColocationToCreateDTO): Promise<ColocationEntity> {
    const createdColocation = this.colocationRepository.create(colocationToCreate);
    const savedColocation = await this.colocationRepository.save(createdColocation);
    return savedColocation;
  }

  async getColocations(criteria: ColocationToModifyDTO): Promise<ColocationEntity[]> {
    return this.colocationRepository.findBy(criteria);
  }

  async getColocationById(id: number): Promise<ColocationEntity | null> {
    return this.colocationRepository.findOneBy({ id });
  }

  async getColocationByCriteria(criteria: Partial<ColocationEntity>): Promise<ColocationEntity[]> {
    return this.colocationRepository.findBy(criteria);
  }

  async deleteColocation(id: number, userId: number): Promise<void> {
    const colocation = await this.getColocationById(id);

    if (!colocation) {
      throw new AppError(404, "Colocation not found");
    }

    if (userId !== colocation.owner.id) {
      throw new AppError(403, "You can't delete others colocation");
    }

    if (colocation.roommates.length) {
      throw new AppError(400, "You can't delete a colocation with roommates");
    }

    if (colocation.charges.find(charge => !charge.payed)) {
      throw new AppError(400, "You can't delete a colocation with unpaid charges");
    }

    colocation.isActive = false;

    await this.colocationRepository.save(colocation);
  }

  async updateColocation(id: number, colocationToUpdate: Partial<ColocationEntity>, userId: number, chiefId: number | null = null): Promise<ColocationEntity | null> {
    const colocation = await this.getColocationById(id);

    if (!colocation) {
      throw new AppError(404, "Colocation not found");
    }

    if (chiefId) {
      const chief = await this.colocationRepository.findUserById(chiefId);
      if (!chief) {
        throw new AppError(404, "Chief not found");
      }
      if (!colocation.chief?.id && colocation.owner.id !== userId || colocation.chief?.id !== userId) {
        throw new AppError(400, "You don't have the permission to update the chief");
      }
      if (!colocation.roommates.some(r => r.id === chiefId)) {
        throw new AppError(400, "The new chief must be a roommate in the colocation");
      }
      colocationToUpdate.chief = chief;
    }

    if (userId !== colocation.owner.id) {
      throw new AppError(403, "You can't update others colocation");
    }

    Object.assign(colocation, colocationToUpdate);

    await this.colocationRepository.save(colocation);
    return colocation;
  }

  async replaceColocation(id: number, colocationToReplace: ColocationToCreateDTO): Promise<ColocationEntity | null> {
    await this.colocationRepository.replace(id, colocationToReplace);
    return this.getColocationById(id);
  }

  async addRoommate(colocationId: number, roommateId: number): Promise<ColocationEntity | null> {
    const colocation = await this.getColocationById(colocationId);
    if (!colocation) {
      throw new AppError(404, "Colocation not found");
    }

    const roommate = await this.colocationRepository.findUserById(roommateId);
    if (!roommate) {
      throw new AppError(404, "Roommate not found");
    }

    if (colocation.roommates.find(roommate => roommate.id === roommateId)) {
      throw new AppError(400, "You cannot add a roommate thas is already in a colocation")
    }

    if (colocation.roommates.some(r => r.id === roommateId)) {
      throw new AppError(400, "Roommate already in the colocation");
    }

    colocation.roommates.push(roommate);

    await this.colocationRepository.save(colocation);
    return colocation;
  }

  async removeRoommate(colocationId: number, roommateId: number): Promise<ColocationEntity | null> {
    const colocation = await this.getColocationById(colocationId);
    if (!colocation) {
      throw new AppError(404, "Colocation not found");
    }

    const roommate = await this.colocationRepository.findUserById(roommateId);
    if (!roommate) {
      throw new AppError(404, "Roommate not found");
    }

    if (!colocation.roommates.some(r => r.id === roommateId)) {
      throw new AppError(400, "Roommate not in the colocation");
    }

    colocation.roommates = colocation.roommates.filter(r => r.id !== roommateId);
    await this.colocationRepository.save(colocation);
    return colocation;
  }
}
