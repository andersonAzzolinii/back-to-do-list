import { DataSource } from 'typeorm';
import { Activity } from './entities/Activity';
import { User } from './entities/User';
require('dotenv').config();
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: [Activity, User],
  migrations: ['src/migrations/*.ts'],

});
