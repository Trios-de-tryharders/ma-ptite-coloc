import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || 'JWT_SECRET';
const SECRET_KEY_REFRESH = process.env.JWT_REFRESH_SECRET || 'JWT_REFRESH_SECRET';

export const signJWT = async (user: any): Promise<string> => {
    const expiresIn = 60 * 15 * 60;
    return jwt.sign({
        user: user
    },
    SECRET_KEY,
    {
        expiresIn: expiresIn
    });
};

export const signJWTSecret = async (user: any): Promise<string> => {
    const expiresIn = 24 * 60 * 60;
    return jwt.sign({
        user: user
    },
    SECRET_KEY_REFRESH,
    {
        expiresIn: expiresIn
    });
};

export const verifyJWT = async (token: string): Promise<any> => {
    return jwt.verify(token, SECRET_KEY);
};

export const decodeJWT = async (token: string): Promise<any> => {
    return jwt.decode(token);
};

export const verifyJWTSecret = async (token: string): Promise<any> => {
    return jwt.verify(token, SECRET_KEY_REFRESH);
};