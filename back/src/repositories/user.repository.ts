import { Repository } from "typeorm";
import { UserEntity } from "../databases/mysql/user.entity";
import { connectMySQLDB } from "../configs/databases/mysql.config";
import { SearchUserCriteriaDTO, UserToCreateDTO, UserToModifyDTO, UserToReplaceDTO } from "../types/user/dtos";
import { userToCreateInput } from "../types/user/Inputs";

export class UserRepository {
  private userDB: Repository<UserEntity>;

  constructor() {
    this.userDB = connectMySQLDB.getRepository(UserEntity);
  }

  create(user: userToCreateInput): UserEntity {
    const newUser = this.userDB.create({ ...user, isAdmin: user.isAdmin ?? false });
    return newUser;
  }

  async update(id: number, userToUpdate: Partial<UserEntity>): Promise<void> {
    await this.userDB.update(id, userToUpdate);
  }

  async replace(id: number, userToReplace: UserToReplaceDTO): Promise<void> {
    await this.userDB.save({ ...userToReplace, id });
  }

  async findBy(criteria: SearchUserCriteriaDTO): Promise<UserEntity[]> {
    return this.userDB.find({ where: criteria, relations: ["ownedColocations", "distributions", "colocations"] });
  }

  async findOneBy(criteria: SearchUserCriteriaDTO): Promise<UserEntity | null> {
    return this.userDB.findOne({ where: criteria, relations: ["ownedColocations", "distributions", "colocations"] });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userDB.find({ relations: ["ownedColocations", "distributions", "colocations"] });
  }

  async delete(id: number): Promise<void> {
    await this.userDB.delete(id);
  }

  async save(user: UserEntity): Promise<UserEntity> {
    return this.userDB.save(user);
  }
}