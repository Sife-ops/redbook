import { StackContext, Api } from "@serverless-stack/resources";

const publicKey = process.env.PUBLIC_KEY;

export function stack({ stack }: StackContext) {
  if (!publicKey) {
    throw new Error("public key undefined");
  }

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        environment: {
          PUBLIC_KEY: publicKey,
        },
      },
    },

    routes: {
      "POST /": "functions/lambda.handler",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
