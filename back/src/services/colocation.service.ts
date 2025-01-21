import { ColocationEntity } from "../databases/mysql/colocation.entity";
import { ColocationRepository } from "../repositories/colocation.repository";
import { ColocationToCreateDTO } from "../types/colocation/dtos";

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

  async deleteColocation(id: number): Promise<void> {
    await this.colocationRepository.delete(id);
  }

  async updateColocation(id: number, colocationToUpdate: Partial<ColocationEntity>): Promise<ColocationEntity | null> {
    await this.colocationRepository.update(id, colocationToUpdate);
    return this.getColocationById(id);
  }

  async replaceColocation(id: number, colocationToReplace: ColocationToCreateDTO): Promise<ColocationEntity | null> {
    await this.colocationRepository.replace(id, colocationToReplace);
    return this.getColocationById(id);
  }
}
