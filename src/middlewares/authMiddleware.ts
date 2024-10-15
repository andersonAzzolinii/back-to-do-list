// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { createError } from '../helpers/errorHelper';

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token)
    return next(createError('Access denied. No token provided.', 403))

  jwt.verify(token, secretKey, (err, user) => {
    if (err)
      return next(createError('Invalid token', 403))

    next();
  });
};
