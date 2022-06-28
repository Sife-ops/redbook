import { DataSource } from 'typeorm';
import { User } from './entity/User';

const {
  POSTGRES_DATABASE_TYPEORM,
  POSTGRES_HOST_TYPEORM,
  POSTGRES_PASSWORD_TYPEORM,
  POSTGRES_PORT_TYPEORM,
  POSTGRES_USERNAME_TYPEORM,
} = process.env;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: POSTGRES_HOST_TYPEORM,
  port: parseInt(POSTGRES_PORT_TYPEORM!),
  username: POSTGRES_USERNAME_TYPEORM,
  password: POSTGRES_PASSWORD_TYPEORM,
  database: POSTGRES_DATABASE_TYPEORM,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
