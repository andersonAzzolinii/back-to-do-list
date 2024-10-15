import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Activity } from '../entities/Activity';
import { createError } from '../helpers/errorHelper';
import { UserRepository } from './user';

const userRepository = new UserRepository()
export class ActivityRepository {
  private repository: Repository<Activity>;

  constructor() {
    this.repository = AppDataSource.getRepository(Activity);
  }

  async create(id_user: string, title: string): Promise<Activity> {
    try {
      const user = await userRepository.getById(id_user)
      const acitivity = await this.repository.create({ user: user, title })

      return await this.repository
        .save(acitivity)
    } catch (error) {
      console.error(`ActivityRepository: error to create new activity ${error}`)
      throw error
    }
  }

  async getAllWithOffset(page: number, pageSize: number, userId: string) {
    try {

      const pageNumber = page || 1;
      const pageSizeNumber = pageSize || 20;
      const offset = (pageNumber - 1) * pageSizeNumber;

      const user = await userRepository.getById(userId)
      if (!user)
        return createError('User not found', 404)

      return await this.repository.query(`
      SELECT * FROM activity 
      WHERE id_user = $1 
        AND exclusion_date is null
      LIMIT $2 
      OFFSET $3
    `, [userId, pageSizeNumber, offset]);

    } catch (error) {
      console.error(`ActivityRepository: error to get activities ${error}`)
      throw error
    }
  }

  async update(body: Activity) {
    try {
      body.done_date = body.completed ? new Date() : null
      return await this.repository.update(body.id, body);
    } catch (error) {
      console.error(`ActivityRepository: error to update activity`)
      throw error
    }
  }

  async delete(acitivity: Activity) {
    try {
      acitivity.exclusion_date = new Date
      return await this.repository.update(acitivity.id, acitivity);
    } catch (error) {
      console.error(`ActivityRepository: error to update activity`)
      throw error
    }
  }

  async findPerId(id: string) {
    try {
      return await this.repository.findOneBy({ id })
    } catch (error) {
      console.error(`ActivityRepository: error to find activity`)
    }
  }
}
