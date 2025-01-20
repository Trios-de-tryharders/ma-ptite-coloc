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

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: number): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({id});
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

  async deleteUser(id: string){
    const user = await this.userRepository.findOneBy({ id: parseInt(id, 10)});

    if (!user) {
      throw new AppError(404, "No user found with this id");
    }

    await this.userRepository.delete(parseInt(id, 10));

    return "The user has been deleted"
  }
}