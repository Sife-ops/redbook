import {
  Api,
  Bucket,
  Function,
  StackContext,
} from '@serverless-stack/resources';

const { PUBLIC_KEY, REDBOOK_ENV } = process.env;

const DB = {
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_USERNAME: process.env.POSTGRES_USERNAME,
};

export function stack({ stack }: StackContext) {
  const api = new Api(stack, 'api', {
    defaults: {
      function: {
        environment: {
          ...DB,
          PUBLIC_KEY,
          REDBOOK_ENV,
        },
      },
    },

    routes: {
      'POST /': 'functions/bot.handler',
    },
  });

  const exportJsonBucket = new Bucket(stack, 'exportJsonBucket');

  const exportJsonLambda = new Function(stack, 'exportJsonLambda', {
    handler: 'functions/export-json.handler',
    environment: {
      ...DB,
      BUCKET: exportJsonBucket.bucketName,
    },
    permissions: [exportJsonBucket],
  });

  stack.addOutputs({
    // todo: rename
    ApiEndpoint: api.url,
    ExportJsonBucket: exportJsonBucket.bucketName,
  });
}
