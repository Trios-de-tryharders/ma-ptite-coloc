import { Repository } from "typeorm";
import { UserEntity } from "../databases/mysql/user.entity";
import { connectMySQLDB } from "../configs/databases/mysql.config";
import { UserToCreateDTO } from "../types/user/dtos";
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

  async findOneByMail(mail: string): Promise<UserEntity | null> {
    return this.userDB.findOne({ where: { email: mail } });
  }

  async findOneById(id: number): Promise<UserEntity | null> {
    return this.userDB.findOne({ where: { id } });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userDB.find();
  }

  async save(user: UserEntity): Promise<UserEntity> {
    return this.userDB.save(user);
  }
}