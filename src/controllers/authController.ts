// src/controllers/authController.ts
import { Request, Response, NextFunction } from 'express';
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
        return next(createError('User not found.', 401))

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return next(createError('Invalid password.', 401))

      const token = jwt.sign({ id: user.id, username: user.username }, secretKey, {
        expiresIn: '6h',
      });
      delete user.password
      res.status(200).json({ token, user });
    } catch (error) {
      console.error(`Error during login: ${error.message}`)
      next(createError('Internal Server Error. Please try again later.', 500))
    }
  }

}


