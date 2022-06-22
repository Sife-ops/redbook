import { StackContext, Api, Table } from "@serverless-stack/resources";

const publicKey = process.env.PUBLIC_KEY;

export function stack({ stack }: StackContext) {
  if (!publicKey) {
    throw new Error("public key undefined");
  }

  const table = new Table(stack, "table", {
    fields: {
      pk: "string",
      sk: "string",
      prediction: "string",
    },
    primaryIndex: { partitionKey: "pk", sortKey: "sk" },
    globalIndexes: {
      predictionUserIndex: {
        partitionKey: "prediction",
        sortKey: "sk",
      },
    },
  });

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        environment: {
          PUBLIC_KEY: publicKey,
          TABLE_NAME: table.tableName,
        },
      },
    },

    routes: {
      "POST /": "functions/lambda.handler",
    },
  });

  api.attachPermissions([table]);

  stack.addOutputs({
    ApiEndpoint: api.url,
    Table: table.tableName,
  });
}
