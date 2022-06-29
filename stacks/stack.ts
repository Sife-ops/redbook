import { StackContext, Api } from '@serverless-stack/resources';

// todo: env definition
const {
  POSTGRES_DATABASE,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USERNAME,
  PUBLIC_KEY,

  POSTGRES_DATABASE_TYPEORM,
  POSTGRES_HOST_TYPEORM,
  POSTGRES_PASSWORD_TYPEORM,
  POSTGRES_PORT_TYPEORM,
  POSTGRES_USERNAME_TYPEORM,
} = process.env;

export function stack({ stack }: StackContext) {
  if (
    !POSTGRES_DATABASE ||
    !POSTGRES_HOST ||
    !POSTGRES_PASSWORD ||
    !POSTGRES_PORT ||
    !POSTGRES_USERNAME ||
    !PUBLIC_KEY ||
    //
    !POSTGRES_DATABASE_TYPEORM ||
    !POSTGRES_HOST_TYPEORM ||
    !POSTGRES_PASSWORD_TYPEORM ||
    !POSTGRES_PORT_TYPEORM ||
    !POSTGRES_USERNAME_TYPEORM
  ) {
    throw new Error('environment variable undefined');
  }

  const api = new Api(stack, 'api', {
    defaults: {
      function: {
        bundle: {
          nodeModules: ['pg-native', 'typeorm'],
        },
        environment: {
          POSTGRES_DATABASE,
          POSTGRES_HOST,
          POSTGRES_PASSWORD,
          POSTGRES_PORT,
          POSTGRES_USERNAME,
          PUBLIC_KEY,

          POSTGRES_DATABASE_TYPEORM,
          POSTGRES_HOST_TYPEORM,
          POSTGRES_PASSWORD_TYPEORM,
          POSTGRES_PORT_TYPEORM,
          POSTGRES_USERNAME_TYPEORM,
        },
      },
    },

    routes: {
      'POST /': 'functions/lambda.handler',
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
