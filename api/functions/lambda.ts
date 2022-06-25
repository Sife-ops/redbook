import * as command from '../lib/command';
import util from 'util';
import { APIGatewayProxyResultV2, Handler } from 'aws-lambda';
import { Event } from '../lib/event';
import { verify } from '../lib/verify';
import { Kysely, Generated, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

const {
  POSTGRES_DATABASE,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_USERNAME,
} = process.env;

interface UserTable {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
}

interface Database {
  user: UserTable;
}

type EventHandler<T = never> = Handler<Event, APIGatewayProxyResultV2<T>>;

export const handler: EventHandler = async (event) => {
  const db = new Kysely<Database>({
    // Use MysqlDialect for MySQL and SqliteDialect for SQLite.
    dialect: new PostgresDialect({
      pool: new Pool({
        database: POSTGRES_DATABASE,
        host: POSTGRES_HOST,
        password: POSTGRES_PASSWORD,
        user: POSTGRES_USERNAME,
      }),
    }),
  });

  const a = await db
    .insertInto('user')
    .values({
      avatar: 'a',
      discriminator: 'a',
      id: 'a',
      username: 'a',
    })
    .returning('id')
    .execute();

  console.log(a);

  const body = JSON.parse(event.body);
  // console.log('body', util.inspect(body, false, null, true));

  return JSON.stringify({
    type: 4,
    data: {
      content: 'test',
    },
  });

  if (body.type === 1) {
    return verify(event);
  }

  if (body.type === 2) {
    try {
      //@ts-ignore
      return await command[body.data.name](body);
    } catch (ex: unknown) {
      console.log(ex);
    }
  }

  return {
    statusCode: 404,
  };
};
