import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { UserToCreateDTO } from "../types/user/dtos";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UserPresenter } from "../types/user/presenters";

const userService = new UserService();

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
   const userToCreateDTO = plainToInstance(UserToCreateDTO, req.body, { excludeExtraneousValues: true });

   const dtoErrors = await validate(userToCreateDTO);
   if (dtoErrors.length > 0) {
     console.log(dtoErrors);
     throw new Error("Invalid fields");
   }
    
    const user = await userService.registerUser(req.body);
    // appeler le logger service pour enregistrer QUI a créer un utilisateur (peut être un admin ou l'utilisateur lui même (?)  )

    const createdUser = plainToInstance(UserPresenter, user, { excludeExtraneousValues: true });
    res.status(201).json(createdUser); // à vous de créer une class pour gérer les success
  } catch (error) {
    next(error); // Pass the error to the next middleware (errorHandler)
  }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    const usersPresenters = users.map(user => plainToInstance(UserPresenter, user, { excludeExtraneousValues: true }));
    res.status(200).json(usersPresenters); // à vous de créer une class pour gérer les success
  } catch (error) {
    next(error); // Pass the error to the next middleware (errorHandler)
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await userService.getUserById(id);

    if (!user) {
      res.status(404).json({ message: "User not found" }); // à vous de créer une class pour gérer les erreurs
      return;
    }

    const userPresenter = plainToInstance(UserPresenter, user, { excludeExtraneousValues: true });
    res.status(200).json(userPresenter); // à vous de créer une class pour gérer les success
  } catch (error) {
    next(error); // Pass the error to the next middleware (errorHandler)
  }
};