import { UserEntity } from "../databases/mysql/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { SearchUserCriteriaDTO, UserToCreateDTO } from "../types/user/dtos";
import { sendEmail } from "./emailService";
import AppError from "../utils/appError";
import * as bcrypt from 'bcrypt';

export class UserService {
  private userRepository = new UserRepository();

  async registerUser(userToCreate: UserToCreateDTO): Promise<UserEntity> {
    // ON CHECK SI L'UTILISATEUR EXISTE DÉJÀ DANS LE REPOSITORY
    const userAlreadyExists = await this.userRepository.findOneBy({ email: userToCreate.email });

    if (userAlreadyExists) {
      throw new AppError(409, "User already exists");
    }

    // ON HASH LE MOT DE PASSE
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(userToCreate.password, saltRounds);

    // ON CRÉE L'UTILISATEUR
    const createdUser = this.userRepository.create({ ...userToCreate, password_hash });

    // ON SAUVEGARDE L'UTILISATEUR
    const savedUser = await this.userRepository.save(createdUser);

    // APPELER LE EMAIL SERVICE POUR ENVOYER UNE NOTIFICATION DE CREATION DE COMPTE A L'UTILISATEUR NOUVELLEMENT CRÉÉ
    // sendEmail(savedUser.email, 'Bienvenue sur notre plateforme', 'Votre compte a bien été créé');

    // ON RETOURNE L'UTILISATEUR CRÉÉ
    return savedUser;
  }

  async getUser(criteria: SearchUserCriteriaDTO): Promise<UserEntity[]> {
    return this.userRepository.findBy(criteria);
  }

  async getUserById(id: number): Promise<UserEntity | null> {
    if (isNaN(id)) {
      throw new AppError(400, "Invalid user ID");
    }
    return this.userRepository.findOneBy({ id });
  }

  async getUserBy(criteria: SearchUserCriteriaDTO): Promise<UserEntity | null> {
    return this.userRepository.findOneBy(criteria);
  }

  async getUsersBy(criteria: SearchUserCriteriaDTO): Promise<UserEntity[] | null> {
    return this.userRepository.findBy(criteria);
  }

  async checkConnection(email: string, password: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOneBy({email});

    if (!user) {
      throw new AppError(404, "No user found with this email");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      throw new AppError(401, "No password were found with this email");
    }
    return user;
  }

  async deleteUser(id: number){
    const user = await this.userRepository.findOneBy({ id: id });

    if (!user) {
      throw new AppError(404, "No user found with this id");
    }

    await this.userRepository.delete(id);

    return "The user has been deleted"
  }

  async updateColocation(id: number, colocationToUpdate: Partial<UserEntity>): Promise<UserEntity | null> {
    await this.userRepository.update(id, colocationToUpdate);
    return this.getUserById(id);
  }

  async replaceColocation(id: number, colocationToReplace: UserToCreateDTO): Promise<UserEntity | null> {
    await this.userRepository.replace(id, colocationToReplace);
    return this.getUserBy({id});
  }

  async updateUser(id: number, userToUpdate: Partial<UserEntity>): Promise<UserEntity | null> {
    await this.userRepository.update(id, userToUpdate);
    return this.getUserById(id);
  }

  async replaceUser(id: number, userToReplace: UserToCreateDTO): Promise<UserEntity | null> {
    await this.userRepository.replace(id, userToReplace);
    return this.getUserById(id);
  }

  async getUserProfile(userId: number): Promise<UserEntity | null> {
    return this.getUserById(userId);
  }
}