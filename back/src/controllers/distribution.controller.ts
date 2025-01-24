import { Request, Response, NextFunction } from "express";
import { DistributionService } from "../services/distribution.service";
import { DistributionToCreateDTO, DistributionToUpdateDTO, SearchDistributionCriteriaDTO } from "../types/distribution/dtos";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { DistributionPresenter } from "../types/distribution/presenter";
import AppError from "../utils/appError";
import { writeLog, writePaymentLog } from "../utils/logHandler";
import { DistributionEntity } from "../databases/mysql/distribution.entity";
import { ChargePresenter, DistributionChargePresenter } from "../types/charge/presenter";
import { UserPresenter } from "../types/user/presenters";
import { ChargeService } from "../services/charge.service";

const distributionService = new DistributionService();
const chargeService = new ChargeService();

const transformDistributionToPresenter = (distribution: DistributionEntity): DistributionPresenter => {
    const distributionPresenter = plainToInstance(DistributionPresenter, distribution, { excludeExtraneousValues: true });
    distributionPresenter.charge = plainToInstance(DistributionChargePresenter, distribution.charge, { excludeExtraneousValues: true });
    distributionPresenter.user = plainToInstance(UserPresenter, distribution.user, { excludeExtraneousValues: true });
    return distributionPresenter;
};

export const createDistribution = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const distributionToCreateDTO = plainToInstance(DistributionToCreateDTO, req.body, { excludeExtraneousValues: true });

        const dtoErrors = await validate(distributionToCreateDTO);

        if (dtoErrors.length > 0) {
            const constraints = dtoErrors.map(error => Object.values(error.constraints || {})).flat();
            const errors = constraints.map(constraint => constraint || "").join(", ");
            throw new AppError(400, errors || "Invalid input");
        }

        const user = (req as any).decoded.user;
        

        const distribution = await distributionService.createDistribution(req.body, user.id);

        const createdDistribution = transformDistributionToPresenter(distribution);

        writeLog(`USER: ${user.id} created DISTRIBUTION :${createdDistribution.id}; ACTION: "create"`);

        if (createdDistribution.charge.payed) {
            writePaymentLog(`USER ${createdDistribution.user.id} payed DISTRIBUTION :${createdDistribution.id} for a total of: ${createdDistribution.amount}; ACTION: "pay"`);
        }
        
        res.status(201).json(createdDistribution);
    } catch (error) {
        next(error);
    }
};

export const getDistributions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const criteria = req.query as any;
        if (req.query.id) {
            criteria.id = parseInt(req.query.id as string, 10);
        }

        const searchCriteria = plainToInstance(SearchDistributionCriteriaDTO, criteria, { excludeExtraneousValues: true });

        const dtoErrors = await validate(searchCriteria);
        if (dtoErrors.length > 0) {
            const constraints = dtoErrors.map(error => Object.values(error.constraints || {})).flat();
            const errors = constraints.map(constraint => constraint || "").join(", ");
            throw new AppError(400, errors || "Invalid input");
        }

        const distributions = await distributionService.getDistributions(searchCriteria);
        console.log(distributions);
        const distributionsPresenters = distributions.map(transformDistributionToPresenter);
        res.status(200).json(distributionsPresenters);
    } catch (error) {
        next(error);
    }
};

export const updateDistribution = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);
        const distributionToUpdateDTO = plainToInstance(DistributionToUpdateDTO, req.body, { excludeExtraneousValues: true });

        const user = (req as any).decoded.user;

        const dtoErrors = await validate(distributionToUpdateDTO);
        if (dtoErrors.length > 0) {
            const constraints = dtoErrors.map(error => Object.values(error.constraints || {})).flat();
            const errors = constraints.map(constraint => constraint || "").join(", ");
            throw new AppError(400, errors || "Invalid input");
        }

        if (!(await distributionService.doesDistributionExist(id))) {
            throw new AppError(404, "Distribution not found");
        }

        await distributionService.updateDistribution(id, req.body);
        const updatedDistribution = await distributionService.getDistributionById(id);
        if (!updatedDistribution) {
            throw new AppError(404, "Distribution not found");
        }
        const distributionPresenter = transformDistributionToPresenter(updatedDistribution);

        writeLog(`USER ${user.id} updated DISTRIBUTION :${id}; ACTION: "update"`);

        res.status(200).json(distributionPresenter);
    } catch (error) {
        next(error);
    }
};

export const deleteDistribution = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);

        const user = (req as any).decoded.user;

        writeLog(`USER ${user.id} deleted DISTRIBUTION :${id}; ACTION: "delete"`);

        await distributionService.deleteDistribution(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

export const patchDistribution = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);
        const distributionToPatchDTO = plainToInstance(DistributionToUpdateDTO, req.body, { excludeExtraneousValues: true });

        const dtoErrors = await validate(distributionToPatchDTO, { skipMissingProperties: true });
        if (dtoErrors.length > 0) {
            const constraints = dtoErrors.map(error => Object.values(error.constraints || {})).flat();
            const errors = constraints.map(constraint => constraint || "").join(", ");
            throw new AppError(400, errors || "Invalid input");
        }

        await distributionService.updateDistribution(id, distributionToPatchDTO);
        const patchedDistribution = await distributionService.getDistributionById(id);
        if (!patchedDistribution) {
            throw new AppError(404, "Distribution not found");
        }
        const distributionPresenter = transformDistributionToPresenter(patchedDistribution);

        writeLog(`USER ${(req as any).decoded.user.id} patched DISTRIBUTION :${id}; ACTION: "patch"`);

        res.status(200).json(distributionPresenter);
    } catch (error) {
        next(error);
    }
};
