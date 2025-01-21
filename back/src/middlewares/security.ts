import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || 'JWT_SECRET';
const SECRET_KEY_REFRESH = process.env.JWT_REFRESH_SECRET || 'JWT_REFRESH_SECRET';

export const checkJWT = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return next(new AppError(401, 'No token provided'));
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return next(new AppError(401, 'Failed to authenticate token'));
    }

    (req as any).decoded = decoded;
    next();
  });
};

export const checkJWTSecret = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return next(new AppError(401, 'No token provided'));
  }

  jwt.verify(token, SECRET_KEY_REFRESH, (err, decoded) => {
    if (err) {
      return next(new AppError(401, 'Failed to authenticate token'));
    }

    (req as any).decoded = decoded;
    next();
  });
};
