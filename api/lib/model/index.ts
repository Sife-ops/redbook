import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

import { UserTable } from './entity/user';
import { PredictionTable } from './entity/prediction';
import { JudgeTable } from './entity/judge';

interface Database {
  user: UserTable;
  prediction: PredictionTable;
  judge: JudgeTable;
}

const {
  POSTGRES_DATABASE,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USERNAME,
} = process.env;

const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      database: POSTGRES_DATABASE,
      host: POSTGRES_HOST,
      password: POSTGRES_PASSWORD,
      port: parseInt(POSTGRES_PORT!),
      user: POSTGRES_USERNAME,
    }),
  }),
});

export {
  //
  db,
  UserTable,
  Database,
};
