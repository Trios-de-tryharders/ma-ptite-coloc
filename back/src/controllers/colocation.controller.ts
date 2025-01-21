import { Request, Response, NextFunction } from "express";
import { ColocationService } from "../services/colocation.service";
import { ColocationToCreateDTO, ColocationToModifyDTO } from "../types/colocation/dtos";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ColocationPresenter } from "../types/colocation/presenters";
import AppError from "../utils/appError";
import { UserPresenter } from "../types/user/presenters";

const colocationService = new ColocationService();

export const registerColocation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = (req as any).decoded.user;
    const userId = parseInt(user.id, 10);
    req.body.owner = userId;

    const colocationToCreateDTO = plainToInstance(ColocationToCreateDTO, req.body, { excludeExtraneousValues: true });

    const dtoErrors = await validate(colocationToCreateDTO);
    if (dtoErrors.length > 0) {
      const constraints = dtoErrors.map(error => Object.values(error.constraints || {})).flat();
      const errors = constraints.map(constraint => constraint || "").join(", ");
      throw new AppError(400, errors || "Invalid input");
    }
    
    const colocation = await colocationService.registerColocation(req.body);
    console.log(colocation);
    const createdColocation = plainToInstance(ColocationPresenter, colocation, { excludeExtraneousValues: true });
    if (colocation.roommates) {
      createdColocation.roommates = colocation.roommates.map(roommate => plainToInstance(UserPresenter, roommate, { excludeExtraneousValues: true }));
    }
    if (colocation.chief) {
      createdColocation.chief = plainToInstance(UserPresenter, colocation.chief, { excludeExtraneousValues: true });
    }
    if (colocation.owner) {
      createdColocation.owner = plainToInstance(UserPresenter, colocation.owner, { excludeExtraneousValues: true });
    }
    res.status(201).json(createdColocation);
  } catch (error) {
    next(error);
  }
};

export const getAllColocations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const colocations = await colocationService.getAllColocations();
    const colocationsPresenters = colocations.map(colocation => {
      const colocationPresenter = plainToInstance(ColocationPresenter, colocation, { excludeExtraneousValues: true });
      colocationPresenter.roommates = colocation.roommates.map(roommate => plainToInstance(UserPresenter, roommate, { excludeExtraneousValues: true }));
      if (colocation.chief) {
        colocationPresenter.chief = plainToInstance(UserPresenter, colocation.chief, { excludeExtraneousValues: true });
      }
      if (colocation.owner) {
        colocationPresenter.owner = plainToInstance(UserPresenter, colocation.owner, { excludeExtraneousValues: true });
      }
      return colocationPresenter;
    });
    res.status(200).json(colocationsPresenters);
  } catch (error) {
    next(error);
  }
};

export const getColocationById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const colocation = await colocationService.getColocationById(id);

    if (!colocation) {
      res.status(404).json({ message: "Colocation not found" });
      return;
    }

    const colocationPresenter = plainToInstance(ColocationPresenter, colocation, { excludeExtraneousValues: true });
    colocationPresenter.roommates = colocation.roommates.map(roommate => plainToInstance(UserPresenter, roommate, { excludeExtraneousValues: true }));
    if (colocation.chief) {
      colocationPresenter.chief = plainToInstance(UserPresenter, colocation.chief, { excludeExtraneousValues: true });
    }
    if (colocation.owner) {
      colocationPresenter.owner = plainToInstance(UserPresenter, colocation.owner, { excludeExtraneousValues: true });
    }
    res.status(200).json(colocationPresenter);
  } catch (error) {
    next(error);
  }
};

export const deleteColocation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = (req as any).decoded.user;
    const userId = parseInt(user.id, 10);

    const id = parseInt(req.params.id, 10);

    await colocationService.deleteColocation(id, userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const updateColocation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = (req as any).decoded.user;
    const userId = parseInt(user.id, 10);

    const chiefId = req.body.chiefId || null;

    if (chiefId) {
      req.body.chiefId = parseInt(chiefId, 10);
      delete req.body.chiefId;
    }

    const id = parseInt(req.params.id, 10);
    const colocationToUpdateDTO = plainToInstance(ColocationToModifyDTO, req.body, { excludeExtraneousValues: true });

    const dtoErrors = await validate(colocationToUpdateDTO);
    if (dtoErrors.length > 0) {
      const constraints = dtoErrors.map(error => Object.values(error.constraints || {})).flat();
      const errors = constraints.map(constraint => constraint || "").join(", ");
      throw new AppError(400, errors || "Invalid input");
    }

    const updatedColocation = await colocationService.updateColocation(id, req.body, userId, chiefId);
    const colocationPresenter = plainToInstance(ColocationPresenter, updatedColocation, { excludeExtraneousValues: true });
    if (updatedColocation) {
      colocationPresenter.roommates = updatedColocation.roommates.map(roommate => plainToInstance(UserPresenter, roommate, { excludeExtraneousValues: true }));
      if (updatedColocation.chief) {
        colocationPresenter.chief = plainToInstance(UserPresenter, updatedColocation.chief, { excludeExtraneousValues: true });
      }
      if (updatedColocation.owner) {
        colocationPresenter.owner = plainToInstance(UserPresenter, updatedColocation.owner, { excludeExtraneousValues: true });
      }
      res.status(200).json(colocationPresenter);
    } else {
      res.status(404).json({ message: "Colocation not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const replaceColocation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const colocationToReplaceDTO = plainToInstance(ColocationToCreateDTO, req.body, { excludeExtraneousValues: true });

    const dtoErrors = await validate(colocationToReplaceDTO);
    if (dtoErrors.length > 0) {
      const constraints = dtoErrors.map(error => Object.values(error.constraints || {})).flat();
      const errors = constraints.map(constraint => constraint || "").join(", ");
      throw new AppError(400, errors || "Invalid input");
    }

    const replacedColocation = await colocationService.replaceColocation(id, req.body);
    const colocationPresenter = plainToInstance(ColocationPresenter, replacedColocation, { excludeExtraneousValues: true });
    if (replacedColocation) {
      colocationPresenter.roommates = replacedColocation.roommates.map(roommate => plainToInstance(UserPresenter, roommate, { excludeExtraneousValues: true }));
      if (replacedColocation.chief) {
        colocationPresenter.chief = plainToInstance(UserPresenter, replacedColocation.chief, { excludeExtraneousValues: true });
      }
      if (replacedColocation.owner) {
        colocationPresenter.owner = plainToInstance(UserPresenter, replacedColocation.owner, { excludeExtraneousValues: true });
      }
      res.status(200).json(colocationPresenter);
    } else {
      res.status(404).json({ message: "Colocation not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const addRoommate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = (req as any).decoded.user;
    const userId = parseInt(user.id, 10);
    const colocationId = parseInt(req.params.id, 10);
    const roommateId = parseInt(req.params.roommateId, 10);

    const colocation = await colocationService.getColocationById(colocationId);

    if (!colocation) {
      throw new AppError(404, "Colocation not found");
    }

    if (colocation.owner.id !== userId && !user.isAdmin) {
      throw new AppError(403, "You are not authorized to add a roommate to this colocation");
    }

    await colocationService.addRoommate(colocationId, roommateId);
    const updatedColocation = await colocationService.getColocationById(colocationId);
    const colocationPresenter = plainToInstance(ColocationPresenter, updatedColocation, { excludeExtraneousValues: true });
    if (!updatedColocation) {
      res.send(404).json({ message: "Colocation not found" });
    } else {
      colocationPresenter.roommates = updatedColocation.roommates.map(roommate => plainToInstance(UserPresenter, roommate, { excludeExtraneousValues: true }));
      if (updatedColocation.chief) {
        colocationPresenter.chief = plainToInstance(UserPresenter, updatedColocation.chief, { excludeExtraneousValues: true });
      }
      if (updatedColocation.owner) {
        colocationPresenter.owner = plainToInstance(UserPresenter, updatedColocation.owner, { excludeExtraneousValues: true });
      }
      res.status(200).json(colocationPresenter);
    }
    
  } catch (error) {
    next(error);
  }
};

export const removeRoommate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = (req as any).decoded.user;
    const userId = parseInt(user.id, 10);
    const colocationId = parseInt(req.params.id, 10);
    const roommateId = parseInt(req.params.roommateId);


    const colocation = await colocationService.getColocationById(colocationId);

    if (!colocation) {
      throw new AppError(404, "Colocation not found");
    }

    if (colocation.owner.id !== userId && !user.isAdmin) {
      throw new AppError(403, "You are not authorized to remove a roommate from this colocation");
    }

    await colocationService.removeRoommate(colocationId, roommateId);
    const updatedColocation = await colocationService.getColocationById(colocationId);
    if (updatedColocation) {
      const colocationPresenter = plainToInstance(ColocationPresenter, updatedColocation, { excludeExtraneousValues: true });
      colocationPresenter.roommates = updatedColocation.roommates.map(roommate => plainToInstance(UserPresenter, roommate, { excludeExtraneousValues: true }));
      if (updatedColocation.chief) {
        colocationPresenter.chief = plainToInstance(UserPresenter, updatedColocation.chief, { excludeExtraneousValues: true });
      }
      if (updatedColocation.owner) {
        colocationPresenter.owner = plainToInstance(UserPresenter, updatedColocation.owner, { excludeExtraneousValues: true });
      }
      res.status(200).json(colocationPresenter);
    } else {
      res.status(404).json({ message: "Colocation not found" });
    }
  } catch (error) {
    next(error);
  }
};