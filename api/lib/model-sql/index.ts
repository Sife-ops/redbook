import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

import { UserTable } from './entity/user';
import { PredictionTable } from './entity/prediction';

interface Database {
  user: UserTable;
  prediction: PredictionTable;
}

const {
  POSTGRES_DATABASE,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_USERNAME,
} = process.env;

const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      database: POSTGRES_DATABASE,
      host: POSTGRES_HOST,
      password: POSTGRES_PASSWORD,
      user: POSTGRES_USERNAME,
    }),
  }),
});

export {
  //
  db,
  UserTable,
};
