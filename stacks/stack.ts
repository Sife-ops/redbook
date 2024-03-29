import {
  Api,
  Bucket,
  Function,
  Queue,
  StackContext,
  Table,
  ViteStaticSite,
} from '@serverless-stack/resources';

const { PUBLIC_KEY, REDBOOK_ENV, TOKEN_SECRET } = process.env;

export function stack({ stack }: StackContext) {
  const table = new Table(stack, "table", {
    fields: {
      pk: "string",
      sk: "string",
      gsi1pk: "string",
      gsi1sk: "string",
      gsi2pk: "string",
      gsi2sk: "string",
      gsi3pk: "string",
      gsi3sk: "string",
    },
    primaryIndex: {
      partitionKey: "pk",
      sortKey: "sk",
    },
    globalIndexes: {
      gsi1: {
        partitionKey: "gsi1pk",
        sortKey: "gsi1sk",
      },
      gsi2: {
        partitionKey: "gsi2pk",
        sortKey: "gsi2sk",
      },
      gsi3: {
        partitionKey: "gsi3pk",
        sortKey: "gsi3sk",
      },
    },
  });

  const graphqlApi = new Api(stack, "graphqlApi", {
    defaults: {
      function: {
        permissions: [table],
        environment: {
          TABLE: table.tableName,
          TOKEN_SECRET,
        },
      },
    },
    routes: {
      "POST /graphql": {
        type: "pothos",
        function: {
          handler: "functions/graphql/graphql.handler",
        },
        schema: "api/functions/graphql/schema.ts",
        output: "graphql/schema.graphql",
        commands: [
          "npx genql --output ./graphql/genql --schema ./graphql/schema.graphql --esm",
        ],
      },
    },
  });

  const site = new ViteStaticSite(stack, "site", {
    path: "web",
    buildCommand: "npm run build",
    environment: {
      VITE_GRAPHQL_URL: graphqlApi.url + "/graphql",
    },
  });

  const onboardSqs = new Queue(stack, "onboard-sqs", {
    consumer: {
      function: {
        handler: 'functions/onboard.handler',
        permissions: [table],
        environment: {
          TABLE: table.tableName,
        }
      }
    }
  });

  const bot = new Api(stack, 'api', {
    defaults: {
      function: {
        permissions: [table, onboardSqs],
        environment: {
          ONBOARD_SQS: onboardSqs.queueUrl,
          PUBLIC_KEY,
          REDBOOK_ENV,
          SITE_URL: site.url,
          TABLE: table.tableName,
          TOKEN_SECRET,
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
      BUCKET: exportJsonBucket.bucketName,
      TABLE: table.tableName,
    },
    permissions: [exportJsonBucket, table],
  });

  const importJsonLambda = new Function(stack, 'importJsonLambda', {
    handler: 'functions/import-json.handler',
    environment: {
      BUCKET: exportJsonBucket.bucketName,
      ONBOARD_SQS: onboardSqs.queueUrl,
      TABLE: table.tableName,
    },
    permissions: [exportJsonBucket, table, onboardSqs],
  });

  stack.addOutputs({
    ExportJsonBucket: exportJsonBucket.bucketName,
    ExportJsonLambda: exportJsonLambda.functionArn,
    ImportJsonLambda: importJsonLambda.functionArn,
    BotEndpoint: bot.url,
    GraphqlApi: graphqlApi.url,
    SiteUrl: site.url,
  });
}
