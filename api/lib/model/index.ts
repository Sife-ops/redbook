import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

import { UserTable } from './entity/user';
import { PredictionTable } from './entity/prediction';
import { JudgeTable } from './entity/judge';

export interface Database {
  user: UserTable;
  prediction: PredictionTable;
  judge: JudgeTable;
}

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      database: process.env.POSTGRES_DATABASE,
      host: process.env.POSTGRES_HOST,
      password: process.env.POSTGRES_PASSWORD,
      port: parseInt(process.env.POSTGRES_PORT),
      user: process.env.POSTGRES_USERNAME,
    }),
  }),
});
