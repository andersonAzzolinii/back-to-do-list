import { DataSource } from 'typeorm';
import { Activity } from './entities/Activity';
import { User } from './entities/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'admin',
  database: 'todo_db',
  synchronize: false,
  logging: true,
  entities: [Activity, User],
  migrations: ['src/migrations/*.ts'],

});
