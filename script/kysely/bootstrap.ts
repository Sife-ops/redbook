/*
 * DEPRECATED
 * todo: should be removed after electrodb migration is finalized
 */

import { Kysely, PostgresDialect, sql } from 'kysely';
import { Pool } from 'pg';
import config from '../config';

const {
  POSTGRES_DATABASE,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USERNAME,
} = config;

const db = new Kysely<any>({
  dialect: new PostgresDialect({
    pool: new Pool({
      database: POSTGRES_DATABASE,
      host: POSTGRES_HOST,
      password: POSTGRES_PASSWORD,
      port: POSTGRES_PORT,
      user: POSTGRES_USERNAME,
    }),
  }),
});

const deleteAll = async () => {
  await db.schema.dropTable('judge').execute();
  await db.schema.dropTable('prediction').execute();
  await db.schema.dropTable('user').execute();
};

const createAll = async () => {
  //

  await db.schema
    .createTable('user')
    .addColumn('id', 'varchar(255)', (col) =>
      col.notNull().unique().primaryKey()
    )
    .addColumn('username', 'varchar(255)', (col) => col.notNull())
    .addColumn('discriminator', 'varchar(255)', (col) => col.notNull())
    .addColumn('avatar', 'varchar(255)', (col) => col.notNull())
    .execute();

  await db.schema
    .createTable('prediction')
    .addColumn('id', 'varchar(255)', (col) =>
      col.notNull().unique().primaryKey()
    )
    .addColumn('user_id', 'varchar(255)', (col) =>
      col.references('user.id').onDelete('cascade').notNull()
    )
    // todo: maximum message length?
    .addColumn('conditions', 'varchar(255)', (col) => col.notNull())
    .addColumn('verdict', 'boolean')
    .addColumn('created_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .execute();

  await db.schema
    .createTable('judge')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('prediction_id', 'varchar(255)', (col) =>
      col.references('prediction.id').onDelete('cascade').notNull()
    )
    .addColumn('user_id', 'varchar(255)', (col) => col.notNull())
    .addColumn('verdict', 'boolean')
    .addColumn('created_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .execute();

  //
};

const main = async () => {
  // await deleteAll();
  await createAll();
};

main();
