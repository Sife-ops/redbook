import 'reflect-metadata';

import * as command from '../lib/command';
import util from 'util';
import { APIGatewayProxyResultV2, Handler } from 'aws-lambda';
import { Event, runner } from '../lib/utility';
import { verify } from '../lib/verify';
import { AppDataSource } from '../lib/model-typeorm/data-source';

type EventHandler<T = never> = Handler<Event, APIGatewayProxyResultV2<T>>;

export const handler: EventHandler = async (event) => {
  AppDataSource.initialize()
    .then((e) => {
      console.log(e);
    })
    .catch((error) => console.log(error));

  const body = JSON.parse(event.body);
  console.log('body', util.inspect(body, false, null, true));

  if (body.type === 1) {
    return verify(event);
  }

  if (body.type === 2) {
    try {
      return await runner(command, body.data.name, body);
    } catch (ex: unknown) {
      console.log(ex);
    }
  }

  return {
    statusCode: 404,
  };
};
