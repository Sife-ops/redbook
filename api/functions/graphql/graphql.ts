import { schema } from "./schema";
import { createGQLHandler } from "@serverless-stack/node/graphql";

export const handler = createGQLHandler({
  schema,
  context: async (c): Promise<{ userId: string, predictionId: string }> => {
    return {
      userId: c.event.queryStringParameters!.userId!,
      predictionId: c.event.queryStringParameters!.predictionId!
    }
  }
});

