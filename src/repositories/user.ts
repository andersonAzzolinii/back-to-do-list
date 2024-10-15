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
    const user = this.repository.create({ username, password, });
    await this.repository.save(user);
    return user;
  }

  async getByUsername(username) {
    try {
      return await this.repository.findOne({ where: { username } });
    } catch (error) {
      console.error(`UserRepository: error to verify user existence ${error}`)
    }
  }

  async getById(id: string) {
    try {
      return await this.repository.findOne({ where: { id } });
    } catch (error) {
      console.error(`UserRepository: error to verify user existence ${error}`)
    }
  }
}
