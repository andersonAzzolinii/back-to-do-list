// src/controllers/authController.ts
import { Request, Response, NextFunction } from 'express';
import { DataSource, } from 'typeorm';
import { User } from '../entities/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createError } from '../helpers/errorHelper';
import { UserRepository } from '../repositories/user';

const secretKey = process.env.JWT_SECRET || 'your_secret_key';
const userRepository = new UserRepository()

export class AuthController {

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      const user = await userRepository.getByUsername(username);
      if (!user)
        next(createError('User not found.', 401))

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        next(createError('Invalid password.', 401))

      const token = jwt.sign({ id: user.id, username: user.username }, secretKey, {
        expiresIn: '6h',
      });

      res.status(200).json({ token });
    } catch (error) {
      console.error(`Error during login: ${error.message}`)
      next(createError('Internal Server Error. Please try again later.', 500))
    }
  }

}

export const loginUser = (dataSource: DataSource) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;

      const userRepository = dataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { username } });

      if (!user)
        next(createError('Invalid username or password.', 401))

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        next(createError('Invalid username or password.', 401))

      const token = jwt.sign({ id: user.id, username: user.username }, secretKey, {
        expiresIn: '6h',
      });

      res.json({ token });
    } catch (error) {
      console.error(`Error during login: ${error.message}`)
      next(createError('Internal Server Error. Please try again later.', 500))
    }
  };
};
