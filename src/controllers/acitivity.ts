import { NextFunction, Response, Request } from "express";
import { DataSource, FindOptionsWhere } from "typeorm";
import { Activity } from "../entities/Activity";
import { createError } from "../helpers/errorHelper";
import { User } from "../entities/User";

export const createActivity = (dataSource: DataSource) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const activity = dataSource
        .getRepository(Activity)
        .create(req.body)

      await dataSource.getRepository(Activity).save(activity);
      res.status(201).json({
        message: 'Activity created successfully.',
        data: activity
      })

    } catch (error) {
      console.error(`Error to create new activity. ${error.message}`)
      return next(createError(`Error to create new activity.`, 500));
    }
  };

};
export const getActivities = (dataSource: DataSource) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, pageSize, } = req.query;
      const userId = req.query.user as string;
      const userRepository = dataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { id: userId } });
      if (!user)
        return next(createError('User not found', 404))

      const pageNumber = parseInt(page as string) || 1;
      const pageSizeNumber = parseInt(pageSize as string) || 20;
      const offset = (pageNumber - 1) * pageSizeNumber;

      const activities = await dataSource.query(`
        SELECT * FROM activity 
        WHERE id_user = $1 
          AND exclusion_date is null
        LIMIT $2 
        OFFSET $3
      `, [userId, pageSizeNumber, offset]);

      res.status(200).json({ data: activities },);

    } catch (error) {
      return next(createError(`Error to get activities.`, 500));
    }
  }
}

export const updateActivity = (dataSource: DataSource) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.body;

      const activityRepository = dataSource.getRepository(Activity);
      let activity = await activityRepository.findOneBy({ id });

      if (!activity)
        return next(createError('Activity not found.', 404));

      activity = { ...activity, ...req.body }
      activity.done_date = activity.completed ? new Date() : null
      await activityRepository.update(id, activity);

      res.status(200).json({
        message: 'Activity updated successfully.',
        data: activity,
      });


    } catch (error) {
      return next(createError(`Error to update activity.`, 500));
    }
  };
};


export const deleteActivity = (dataSource: DataSource) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const activityRepository = dataSource.getRepository(Activity);
      let activity = await activityRepository.findOneBy({ id });

      if (!activity)
        return next(createError('Activity not found.', 404));

      const result = await activityRepository.update(id, { ...activity, exclusion_date: new Date() });

      res.status(201).json({
        message: 'Activity deleted successfully.',
        data: result.affected,
      })
    } catch (error) {
      return next(createError(`Error to delete activity.`, 500));
    }
  };
};

