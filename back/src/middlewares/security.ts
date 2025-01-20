import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || 'defaultsecretkey';

export const checkJWT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let token = req.headers['x-access-token'] as string || req.headers['authorization'] as string;
    if (!!token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(401).json('token_not_valid');
            } else {
                (req as any).decoded = decoded;

                const expiresIn = 24 * 60 * 60;
                const newToken  = jwt.sign({
                    user : (decoded as any).user
                },
                SECRET_KEY,
                {
                    expiresIn: expiresIn
                });

                res.header('Authorization', 'Bearer ' + newToken);
                next();
            }
        });
    } else {
        res.status(401).json('token_required');
    }
}


