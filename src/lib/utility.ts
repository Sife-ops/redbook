import Joi from 'joi';
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { faker } from '@faker-js/faker';

export type Event = APIGatewayProxyEventV2 & { body: string };

export const mnemonic = () => {
  const a = faker.word.adjective();
  const b = faker.word.adjective();
  const c = faker.word.noun();
  return `${a}-${b}-${c}`;
};

export const optionValue = (options: any[], optionName: string) => {
  const option = options.find((e: any) => e.name === optionName);
  return option.value;
};

export const runner = async (
  commands: Record<
    string,
    { schema: Joi.ObjectSchema | undefined; handler: any }
  >,
  commandName: string,
  body: any
) => {
  const command = commands[commandName];

  if (command.schema) {
    const validation = command.schema.validate(body);

    if (validation.error) {
      throw new Error(validation.error.message);
    }
  }

  return await command.handler(body);
};
