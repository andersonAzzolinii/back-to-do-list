// src/routes/userRoutes.ts
import { Router } from 'express';
import { DataSource } from 'typeorm';
import { ActivityController } from './controllers/acitivity';

const router = Router();
const acitivityController = new ActivityController()

export const routes = () => {

  router.post('/activity', acitivityController.createActivity)
  router.put('/activity', acitivityController.updateActivity)
  router.delete('/activity/:id', acitivityController.deleteActivity)
  router.get('/activities', acitivityController.getActivities)

  return router;
};
