import { Request, Response, NextFunction } from 'express';
import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { createError } from '../helpers/errorHelper';
import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user';

const userRepository = new UserRepository()


export class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body
      if (!username || !password)
        return next(createError(`Invalid username or password.`, 401));

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const registers = await userRepository.createUser(username, hashedPassword);

      res.status(201).json(registers);
    } catch (error) {
      next(createError(`Error to verify user informations.`, 401));
    }
  }

}
