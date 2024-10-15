import { NextFunction, Response, Request } from "express";
import { createError } from "../helpers/errorHelper";
import { ActivityRepository } from "../repositories/activity";

const activityRepository = new ActivityRepository()
export class ActivityController {

  async createActivity(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_user, title } = req.body
      const registers = await activityRepository.create(id_user, title)
      res.status(201).json({
        message: 'Activity created successfully.',
        data: registers
      })
    } catch (error) {
      next(createError('Error to create new activity', 500))
    }
  }

  async getActivities(req: Request, res: Response) {
    const { page, pageSize, } = req.query;
    const userId = req.query.user as string;

    const registers = await activityRepository.getAllWithOffset(Number(page), Number(pageSize), userId)

    res.status(200).json({ data: registers });
  }

  async updateActivity(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body
      const activity = await activityRepository.findPerId(id);

      if (!activity) {
        return next(createError('Activity not found.', 404));
      }

      const registers = await activityRepository.update(req.body)

      res.status(200).json({
        message: 'Activity updated successfully.',
        data: registers,
      });

    } catch (error) {
      next(createError(`Error to update activity`, 500))
    }
  }

  async deleteActivity(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const activity = await activityRepository.findPerId(id);

      if (!activity)
        return next(createError('Activity not found.', 404));

      const result = await activityRepository.update(activity);

      res.status(201).json({
        message: 'Activity deleted successfully.',
        data: result.affected,
      })
    } catch (error) {
      next(createError('Error to delete activity.', 500));
    }
  }

}


