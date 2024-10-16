import { Router } from 'express';
import { UserController } from './controllers/userController';
import { AuthController } from './controllers/authController';

const router = Router();
const userController = new UserController()
const authController = new AuthController()

export const authRoutes = () => {

  router.post('/create', userController.createUser);
  router.post('/', authController.loginUser);

  return router;
};
