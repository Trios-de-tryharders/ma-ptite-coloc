import { Repository } from "typeorm";
import { UserEntity } from "../databases/mysql/user.entity";
import { connectMySQLDB } from "../configs/databases/mysql.config";
import { SearchUserCriteriaDTO, UserToCreateDTO } from "../types/user/dtos";
import { userToCreateInput } from "../types/user/Inputs";

export class UserRepository {
  private userDB: Repository<UserEntity>;

  constructor() {
    this.userDB = connectMySQLDB.getRepository(UserEntity);
  }

  create(user: userToCreateInput): UserEntity {
    const newUser = this.userDB.create(user);
    return newUser
  }

  // async findOneByMail(mail: string): Promise<UserEntity | null> {
  //   return this.userDB.findOne({ where: { email: mail } });
  // }

  // async findOneById(id: number): Promise<UserEntity | null> {
  //   return this.userDB.findOne({ where: { id } });
  // }

  async findBy(criteria: SearchUserCriteriaDTO): Promise<UserEntity[]> {
    return this.userDB.find({ where: criteria });
  }

  async findOneBy(criteria: SearchUserCriteriaDTO): Promise<UserEntity | null> {
    return this.userDB.findOne({ where: criteria });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userDB.find();
  }

  async delete(id: number): Promise<void> {
    await this.userDB.delete(id);
  }

  async save(user: UserEntity): Promise<UserEntity> {
    return this.userDB.save(user);
  }
}