import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { UserToCreateDTO, UserToModifyDTO, SearchUserCriteriaDTO } from "../types/user/dtos";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UserPresenter } from "../types/user/presenters";
import AppError from "../utils/appError";
import * as jwtService from "../services/jwtService";

const userService = new UserService();

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userToCreateDTO = plainToInstance(UserToCreateDTO, req.body, { excludeExtraneousValues: true });

    const dtoErrors = await validate(userToCreateDTO);
    if (dtoErrors.length > 0) {
      console.log(dtoErrors);
      const constraints = dtoErrors.map(error => Object.values(error.constraints || {})).flat();
      const errors = constraints.map(constraint => constraint || "").join(", ");
      throw new AppError(400, errors || "Invalid input");
    }
    
    const user = await userService.registerUser(req.body);
    // appeler le logger service pour enregistrer QUI a créer un utilisateur (peut être un admin ou l'utilisateur lui même (?)  )

    const createdUser = plainToInstance(UserPresenter, user, { excludeExtraneousValues: true });
    res.status(201).json(createdUser); // à vous de créer une class pour gérer les success
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const criteria = req.query as any;
    if (req.query.id) {
      criteria.id = parseInt(req.query.id as string, 10);
    }
    if (req.query.age) {
      criteria.age = parseInt(req.query.age as string, 10);
    }
    
    const searchCriteria = plainToInstance(SearchUserCriteriaDTO, criteria, { excludeExtraneousValues: true });

    const dtoErrors = await validate(searchCriteria);
    if (dtoErrors.length > 0) {
      const constraints = dtoErrors.map(error => Object.values(error.constraints || {})).flat();
      const errors = constraints.map(constraint => constraint || "").join(", ");
      throw new AppError(400, errors || "Invalid input");
    }

    const users = await userService.getUser(searchCriteria);
    const usersPresenters = users.map(user => plainToInstance(UserPresenter, user, { excludeExtraneousValues: true }));
    res.status(200).json(usersPresenters); // à vous de créer une class pour gérer les success
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new AppError(400, "Invalid user ID");
    }
    const user = await userService.getUserById(id);

    if (!user) {
      res.status(404).json({ message: "User not found" }); // à vous de créer une class pour gérer les erreurs
      return;
    }

    const userPresenter = plainToInstance(UserPresenter, user, { excludeExtraneousValues: true });
    res.status(200).json(userPresenter); // à vous de créer une class pour gérer les success
  } catch (error) {
    next(error);
  }
};

export const refreshUserToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = (req as any).decoded.user;
    console.log(user);
    const token = await jwtService.signJWT(user);

    res.header('Authorization', 'Bearer ' + token);

    res.status(200).json({ auth: 'ok', token });
  } catch (error) {
    next(error);
  }
};

export const checkConnection = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await userService.checkConnection(email, password);

    const userPresenter = plainToInstance(UserPresenter, user, { excludeExtraneousValues: true });
    
    const token = await jwtService.signJWT(userPresenter);

    res.header('Authorization', 'Bearer ' + token);
    
    res.status(200).json(userPresenter); // à vous de créer une class pour gérer les success
  } catch (error) {
    next(error); 
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    res.status(204).send(await userService.deleteUser(id));
  } catch (error) {
    next(error); 
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const userToUpdateDTO = plainToInstance(UserToModifyDTO, req.body, { excludeExtraneousValues: true });

    const dtoErrors = await validate(userToUpdateDTO);
    if (dtoErrors.length > 0) {
      const constraints = dtoErrors.map(error => Object.values(error.constraints || {})).flat();
      const errors = constraints.map(constraint => constraint || "").join(", ");
      throw new AppError(400, errors || "Invalid input");
    }

    const updatedUser = await userService.updateUser(id, req.body);
    const userPresenter = plainToInstance(UserPresenter, updatedUser, { excludeExtraneousValues: true });
    res.status(200).json(userPresenter);
  } catch (error) {
    next(error);
  }
};

export const replaceUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const userToCreateDTO = plainToInstance(UserToCreateDTO, req.body, { excludeExtraneousValues: true });

    const dtoErrors = await validate(userToCreateDTO);
    if (dtoErrors.length > 0) {
      const constraints = dtoErrors.map(error => Object.values(error.constraints || {})).flat();
      const errors = constraints.map(constraint => constraint || "").join(", ");
      throw new AppError(400, errors || "Invalid input");
    }

    const replacedUser = await userService.replaceUser(id, req.body);
    const userPresenter = plainToInstance(UserPresenter, replacedUser, { excludeExtraneousValues: true });
    res.status(200).json(userPresenter);
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  
  try {
    const user = (req as any).decoded.user;
    console.log(user)
    const userId = parseInt(user.id, 10);
    if (isNaN(userId)) {
      throw new AppError(400, "Invalid user ID");
    }

    const userProfile = await userService.getUserById(userId);

    if (!userProfile) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const userPresenter = plainToInstance(UserPresenter, userProfile, { excludeExtraneousValues: true });
    res.status(200).json(userPresenter);
  } catch (error) {
    next(error);
  }
};