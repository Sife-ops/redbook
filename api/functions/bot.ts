import * as command from '../lib/command';
import AWS from "aws-sdk";
import util from 'util';
import { APIGatewayProxyResultV2, Handler } from 'aws-lambda';
import { Event, runner } from '../lib/utility';
import { verify } from '../lib/verify';

const sqs = new AWS.SQS();

const { ONBOARD_SQS, REDBOOK_ENV } = process.env;

type EventHandler<T = never> = Handler<Event, APIGatewayProxyResultV2<T>>;

export const handler: EventHandler = async (event) => {
  const body = JSON.parse(event.body);

  if (REDBOOK_ENV !== 'prod') {
    console.log('body', util.inspect(body, false, null, true));
  }

  if (body.type === 1) {
    return verify(event);
  }

  if (body.type === 2) {
    await sqs
      .sendMessage({
        QueueUrl: ONBOARD_SQS!,
        MessageBody: JSON.stringify(body.member.user),
      })
      .promise();

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
