import { StackContext, Api, Table } from '@serverless-stack/resources';

// todo: env definition
const {
  POSTGRES_DATABASE,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_USERNAME,
  PUBLIC_KEY,
} = process.env;

export function stack({ stack }: StackContext) {
  if (
    !PUBLIC_KEY ||
    !POSTGRES_DATABASE ||
    !POSTGRES_HOST ||
    !POSTGRES_PASSWORD ||
    !POSTGRES_USERNAME
  ) {
    throw new Error('environment variable undefined');
  }

  const table = new Table(stack, 'table', {
    fields: {
      pk: 'string',
      sk: 'string',
      prediction: 'string',
    },
    primaryIndex: { partitionKey: 'pk', sortKey: 'sk' },
    globalIndexes: {
      predictionUserIndex: {
        partitionKey: 'prediction',
        sortKey: 'sk',
      },
    },
  });

  const api = new Api(stack, 'api', {
    defaults: {
      function: {
        // bundle: {
        //   externalModules: ['pg-native'],
        //   minify: false,
        // },
        environment: {
          POSTGRES_DATABASE,
          POSTGRES_HOST,
          POSTGRES_PASSWORD,
          POSTGRES_USERNAME,
          PUBLIC_KEY,
          TABLE_NAME: table.tableName,
        },
      },
    },

    routes: {
      'POST /': 'functions/lambda.handler',
    },
  });

  api.attachPermissions([table]);

  stack.addOutputs({
    ApiEndpoint: api.url,
    Table: table.tableName,
  });
}
