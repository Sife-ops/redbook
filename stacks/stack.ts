import { StackContext, Api } from '@serverless-stack/resources';

const {
  POSTGRES_DATABASE,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USERNAME,
  PUBLIC_KEY,
} = process.env;

export function stack({ stack }: StackContext) {
  const api = new Api(stack, 'api', {
    defaults: {
      function: {
        environment: {
          POSTGRES_DATABASE,
          POSTGRES_HOST,
          POSTGRES_PASSWORD,
          POSTGRES_PORT,
          POSTGRES_USERNAME,
          PUBLIC_KEY,
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
