import { UserEntity } from "../databases/mysql/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { SearchUserCriteriaDTO, UserToCreateDTO, UserToReplaceDTO } from "../types/user/dtos";
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
    const createdUser = this.userRepository.create({ ...userToCreate, password_hash, isAdmin: userToCreate.isAdmin ?? false });

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
      throw new AppError(404, "No user found this email/password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      throw new AppError(401, "No user found with this email/password");
    }
    return user;
  }

  async deleteUser(id: number, userId: number): Promise<string> {
    const user = await this.userRepository.findOneBy({ id: id });

    if (!user) {
      throw new AppError(404, "No user found with this id");
    }

    if (user.id !== userId && !user.isAdmin) {
      throw new AppError(400, "You cannot delete another user's account");
    }

    if (user.ownedColocations) {
      throw new AppError(400, "You can't delete a user that owns a colocation, you must first delete the colocation(s)");
    }

    if (user.colocations) {
      throw new AppError(400, "You can't delete a user that is in a colocation, you must first leave the colocation(s)");
    }


    user.isActive = false;

    await this.userRepository.save(user);

    return "The user has been desactivated"
  }

  async updateColocation(id: number, colocationToUpdate: Partial<UserEntity>): Promise<UserEntity | null> {
    await this.userRepository.update(id, colocationToUpdate);
    return this.getUserById(id);
  }

  async replaceColocation(id: number, colocationToReplace: UserToReplaceDTO): Promise<UserEntity | null> {
    await this.userRepository.replace(id, colocationToReplace);
    return this.getUserBy({id});
  }

  async updateUser(id: number, userToUpdate: Partial<UserEntity>, userId: number): Promise<UserEntity | null> {
    const user = await this.getUserById(id);

    if (!user) {
      throw new AppError(404, "User not found");
    }

    if(userId !== user.id) {
      throw new AppError(403, "You can't update others user");
    }

    await this.userRepository.update(id, userToUpdate);
    return this.getUserById(id);
  }

  async replaceUser(id: number, userToReplace: UserToCreateDTO, userId: number): Promise<UserEntity | null> {
    const user = await this.getUserById(id);

    if (!user) {
      throw new AppError(404, "User not found");
    }

    if(userId !== user.id) {
      throw new AppError(403, "You can't update others user");
    }

    await this.userRepository.replace(id, userToReplace);
    return this.getUserById(id);
  }

  async getUserProfile(userId: number): Promise<UserEntity | null> {
    return this.getUserById(userId);
  }

}