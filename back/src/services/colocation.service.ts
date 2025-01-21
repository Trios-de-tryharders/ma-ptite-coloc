import { ColocationEntity } from "../databases/mysql/colocation.entity";
import { ColocationRepository } from "../repositories/colocation.repository";
import { ColocationToCreateDTO } from "../types/colocation/dtos";
import AppError from "../utils/appError";

export class ColocationService {
  private colocationRepository = new ColocationRepository();

  async registerColocation(colocationToCreate: ColocationToCreateDTO): Promise<ColocationEntity> {

    const createdColocation = this.colocationRepository.create(colocationToCreate);
    const savedColocation = await this.colocationRepository.save(createdColocation);
    return savedColocation;
  }

  async getAllColocations(): Promise<ColocationEntity[]> {
    return this.colocationRepository.findAll();
  }

  async getColocationById(id: number): Promise<ColocationEntity | null> {
    return this.colocationRepository.findOneBy({id});
  }

  async getColocationByCriteria(criteria: Partial<ColocationEntity>): Promise<ColocationEntity[]> {
    return this.colocationRepository.findBy(criteria);
  }

  async deleteColocation(id: number, userId: number): Promise<void> {
    const colocation = await this.getColocationById(id);

    if (!colocation) {
      throw new AppError(404, "Colocation not found");
    }

    if(userId !== colocation.ownerId) {
      throw new AppError(403, "You can't delete others colocation");
    }

    await this.colocationRepository.delete(id);
  }

  async updateColocation(id: number, colocationToUpdate: Partial<ColocationEntity>, userId: number): Promise<ColocationEntity | null> {
    const colocation = await this.getColocationById(id);

    if (!colocation) {
      throw new AppError(404, "Colocation not found");
    }

    if(userId !== colocation.ownerId) {
      throw new AppError(403, "You can't update others colocation");
    }
     
    await this.colocationRepository.update(id, colocationToUpdate);
    return this.getColocationById(id);
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

    if (colocation.roommates.some(r => r.id === roommateId)) {
      throw new AppError(400, "Roommate already in the colocation");
    }

    colocation.roommates.push(roommate);
    await this.colocationRepository.save(colocation);
    return colocation;
  }

  async removeRoommate(colocationId: number, roommateId: number): Promise<ColocationEntity | null> {
    const colocation = await this.getColocationById(colocationId);
    console.log(colocation);
    if (!colocation) {
      throw new AppError(404, "Colocation not found");
    }

    const roommate = await this.colocationRepository.findUserById(roommateId);
    console.log(roommate);
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
