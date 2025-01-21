import { Request, Response, NextFunction } from "express";
import { ChargeService } from "../services/charge.service";
import { ChargeToCreateDTO, ChargeToUpdateDTO, SearchChargeCriteriaDTO } from "../types/charge/dtos";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ChargePresenter } from "../types/charge/presenter";
import AppError from "../utils/appError";
import { writeLog } from "../utils/logHandler";
import { UserPresenter } from "../types/user/presenters";
import { ColocationPresenter } from "../types/colocation/presenters";
import { ChargeEntity } from "../databases/mysql/charge.entity";

const chargeService = new ChargeService();

const transformChargeToPresenter = (charge: ChargeEntity): ChargePresenter => {
    const chargePresenter = plainToInstance(ChargePresenter, charge, { excludeExtraneousValues: true });
    chargePresenter.payer = plainToInstance(UserPresenter, charge.payer, { excludeExtraneousValues: true });
    chargePresenter.colocation = plainToInstance(ColocationPresenter, charge.colocation, { excludeExtraneousValues: true });
    return chargePresenter;
};

export const createCharge = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const chargeToCreateDTO = plainToInstance(ChargeToCreateDTO, req.body, { excludeExtraneousValues: true });

        const dtoErrors = await validate(chargeToCreateDTO);

        if (dtoErrors.length > 0) {
            const constraints = dtoErrors.map(error => Object.values(error.constraints || {})).flat();
            const errors = constraints.map(constraint => constraint || "").join(", ");
            throw new AppError(400, errors || "Invalid input");
        }

        const charge = await chargeService.createCharge(req.body);
        const createdCharge = transformChargeToPresenter(charge);

        writeLog(`CHARGE :${createdCharge.id}; ACTION: "create"`);

        res.status(201).json(createdCharge);
    } catch (error) {
        next(error);
    }
};

export const getCharges = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const criteria = req.query as any;
        if (req.query.id) {
            criteria.id = parseInt(req.query.id as string, 10);
        }

        const searchCriteria = plainToInstance(SearchChargeCriteriaDTO, criteria, { excludeExtraneousValues: true });

        const dtoErrors = await validate(searchCriteria);
        if (dtoErrors.length > 0) {
            const constraints = dtoErrors.map(error => Object.values(error.constraints || {})).flat();
            const errors = constraints.map(constraint => constraint || "").join(", ");
            throw new AppError(400, errors || "Invalid input");
        }

        const charges = await chargeService.getCharges(searchCriteria);
        const chargesPresenters = charges.map(transformChargeToPresenter);
        res.status(200).json(chargesPresenters);
    } catch (error) {
        next(error);
    }
};

export const updateCharge = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);
        const chargeToUpdateDTO = plainToInstance(ChargeToCreateDTO, req.body, { excludeExtraneousValues: true });

        const dtoErrors = await validate(chargeToUpdateDTO);
        if (dtoErrors.length > 0) {
            const constraints = dtoErrors.map(error => Object.values(error.constraints || {})).flat();
            const errors = constraints.map(constraint => constraint || "").join(", ");
            throw new AppError(400, errors || "Invalid input");
        }

        if (!(await chargeService.doesChargeExist(id))) {
            throw new AppError(404, "Charge not found");
        }

        await chargeService.updateCharge(id, req.body);
        const updatedCharge = await chargeService.getChargeById(id);
        if (!updatedCharge) {
            throw new AppError(404, "Charge not found");
        }
        const chargePresenter = transformChargeToPresenter(updatedCharge);

        writeLog(`CHARGE :${id}; ACTION: "update"`);

        res.status(200).json(chargePresenter);
    } catch (error) {
        next(error);
    }
};

export const deleteCharge = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);

        writeLog(`CHARGE :${id}; ACTION: "delete"`);

        await chargeService.deleteCharge(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

export const patchCharge = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);
        const chargeToPatchDTO = plainToInstance(ChargeToUpdateDTO, req.body, { excludeExtraneousValues: true });

        const dtoErrors = await validate(chargeToPatchDTO, { skipMissingProperties: true });
        if (dtoErrors.length > 0) {
            const constraints = dtoErrors.map(error => Object.values(error.constraints || {})).flat();
            const errors = constraints.map(constraint => constraint || "").join(", ");
            throw new AppError(400, errors || "Invalid input");
        }

        await chargeService.patchCharge(id, chargeToPatchDTO);
        const patchedCharge = await chargeService.getChargeById(id);
        if (!patchedCharge) {
            throw new AppError(404, "Charge not found");
        }
        const chargePresenter = transformChargeToPresenter(patchedCharge);

        writeLog(`CHARGE :${id}; ACTION: "patch"`);

        res.status(200).json(chargePresenter);
    } catch (error) {
        next(error);
    }
};