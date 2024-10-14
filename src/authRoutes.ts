import { Router } from 'express';
import { DataSource } from 'typeorm';
import { UserController } from './controllers/userController';
import { AuthController, loginUser } from './controllers/authController';

const router = Router();
const userController = new UserController()
const authController = new AuthController()

export const authRoutes = (dataSource: DataSource) => {

  router.post('/create', userController.createUser);
  router.post('/', authController.loginUser);

  return router;
};
