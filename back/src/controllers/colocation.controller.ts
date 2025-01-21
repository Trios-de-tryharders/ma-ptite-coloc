import { Request, Response, NextFunction } from "express";
import { ColocationService } from "../services/colocation.service";
import { ColocationToCreateDTO, ColocationToModifyDTO } from "../types/colocation/dtos";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ColocationPresenter } from "../types/colocation/presenters";
import AppError from "../utils/appError";

const colocationService = new ColocationService();

export const registerColocation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const colocationToCreateDTO = plainToInstance(ColocationToCreateDTO, req.body, { excludeExtraneousValues: true });

    const dtoErrors = await validate(colocationToCreateDTO);
    if (dtoErrors.length > 0) {
      const constraints = dtoErrors.map(error => Object.values(error.constraints || {})).flat();
      const errors = constraints.map(constraint => constraint || "").join(", ");
      throw new AppError(400, errors || "Invalid input");
    }
    
    const colocation = await colocationService.registerColocation(req.body);
    const createdColocation = plainToInstance(ColocationPresenter, colocation, { excludeExtraneousValues: true });
    res.status(201).json(createdColocation);
  } catch (error) {
    next(error);
  }
};

export const getAllColocations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const colocations = await colocationService.getAllColocations();
    const colocationsPresenters = colocations.map(colocation => plainToInstance(ColocationPresenter, colocation, { excludeExtraneousValues: true }));
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
    res.status(200).json(colocationPresenter);
  } catch (error) {
    next(error);
  }
};

export const deleteColocation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    await colocationService.deleteColocation(parseInt(id, 10));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const updateColocation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const colocationToUpdateDTO = plainToInstance(ColocationToModifyDTO, req.body, { excludeExtraneousValues: true });

    const dtoErrors = await validate(colocationToUpdateDTO);
    if (dtoErrors.length > 0) {
      const constraints = dtoErrors.map(error => Object.values(error.constraints || {})).flat();
      const errors = constraints.map(constraint => constraint || "").join(", ");
      throw new AppError(400, errors || "Invalid input");
    }

    const updatedColocation = await colocationService.updateColocation(id, req.body);
    const colocationPresenter = plainToInstance(ColocationPresenter, updatedColocation, { excludeExtraneousValues: true });
    res.status(200).json(colocationPresenter);
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
    res.status(200).json(colocationPresenter);
  } catch (error) {
    next(error);
  }
};
