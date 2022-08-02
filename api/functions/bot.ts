import * as command from '../lib/command';
import util from 'util';
import { APIGatewayProxyResultV2, Handler } from 'aws-lambda';
import { Event, runner } from '../lib/utility';
import { verify } from '../lib/verify';

type EventHandler<T = never> = Handler<Event, APIGatewayProxyResultV2<T>>;

export const handler: EventHandler = async (event) => {
  const body = JSON.parse(event.body);
  // console.log('body', util.inspect(body, false, null, true));

  if (body.type === 1) {
    return verify(event);
  }

  if (body.type === 2) {
    try {
      const response = await runner(command, body.data.name, body);
      return JSON.stringify(response);
    } catch (ex: unknown) {
      console.log(ex);
    }
  }

  return {
    statusCode: 404,
  };
};
