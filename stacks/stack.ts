import {
  Api,
  Bucket,
  Function,
  Queue,
  StackContext,
  Table,
} from '@serverless-stack/resources';

const { PUBLIC_KEY, REDBOOK_ENV } = process.env;

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

  const mnemonicDlq = new Queue(stack, "mnemonic-dlq");

  const bot = new Api(stack, 'api', {
    defaults: {
      function: {
        permissions: [table, mnemonicDlq],
        environment: {
          PUBLIC_KEY,
          REDBOOK_ENV,
          MNEMONIC_DLQ: mnemonicDlq.queueUrl, // todo: can't use queueName???
          TABLE: table.tableName
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
      TABLE: table.tableName,
      BUCKET: exportJsonBucket.bucketName,
    },
    permissions: [exportJsonBucket],
  });

  stack.addOutputs({
    MnemonicDlq: mnemonicDlq.queueUrl,
    BotEndpoint: bot.url,
    ExportJsonBucket: exportJsonBucket.bucketName,
  });
}
