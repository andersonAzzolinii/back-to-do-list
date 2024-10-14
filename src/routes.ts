// src/routes/userRoutes.ts
import { Router } from 'express';
import { DataSource } from 'typeorm';
import { createActivity, deleteActivity, getActivities, updateActivity } from './controllers/acitivity';

const router = Router();

export const routes = (dataSource: DataSource) => {

  router.post('/activity', createActivity(dataSource))
  router.put('/activity', updateActivity(dataSource))
  router.delete('/activity/:id', deleteActivity(dataSource))
  router.get('/activities', getActivities(dataSource))

  return router;
};
