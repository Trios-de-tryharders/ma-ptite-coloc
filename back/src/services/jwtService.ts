import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || 'defaultsecretkey';

export const signJWT = async (user: any): Promise<string> => {
    const expiresIn = 24 * 60 * 60;
    return jwt.sign({
        user: user
    },
    SECRET_KEY,
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