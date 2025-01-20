import { UserEntity } from "../databases/mysql/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { UserToCreateDTO } from "../types/user/dtos";
import { sendEmail } from "./emailService";
import AppError from "../utils/appError";
import * as bcrypt from 'bcrypt';

export class UserService {
  private userRepository = new UserRepository();

  async registerUser(userToCreate: UserToCreateDTO): Promise<UserEntity> {
    // ON CHECK SI L'UTILISATEUR EXISTE DÉJÀ DANS LE REPOSITORY
    const userAlreadyExists = await this.userRepository.findOneByMail(userToCreate.email);

    if (userAlreadyExists) {
    throw new AppError(409, "User already exists");
    }

    // ON HASH LE MOT DE PASSE
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(userToCreate.password, saltRounds);

    // ON CRÉE L'UTILISATEUR
    const createdUser = this.userRepository.create({...userToCreate, password_hash});

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
    return this.userRepository.findOneById(id);
  }
}