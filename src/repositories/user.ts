// repositories/UserRepository.ts
import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { AppDataSource } from '../data-source';


export class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async createUser(username: string, password: string): Promise<User> {
    try {
      const user = this.repository.create({ username, password, });
      await this.repository.save(user);
      return user;

    } catch (error) {
      console.error(`UserRepository.createUser: Error to create user ${error}`)
      throw error
    }
  }

  async getByUsername(username) {
    try {
      return await this.repository.findOne({ where: { username } });
    } catch (error) {
      console.error(`UserRepository.getByUsername: error to verify user existence ${error}`)
      throw error
    }
  }

  async getById(id: string) {
    try {
      return await this.repository.findOne({ where: { id } });
    } catch (error) {
      console.error(`UserRepository.getById: error to verify user existence ${error}`)
      throw error
    }
  }
}
