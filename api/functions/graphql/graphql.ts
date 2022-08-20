import { createGQLHandler } from "@serverless-stack/node/graphql";
import { schema } from "./schema";
import { verify, JwtPayload } from 'jsonwebtoken';

const { TOKEN_SECRET } = process.env

interface ContextPayload extends JwtPayload {
  predictionId: string
  userId: string
  username: string
  avatar: string
  discriminator: string
}

export const handler = createGQLHandler({
  schema,
  context: async (c) => {
    // todo: non null assertions
    const {
      predictionId,
      avatar,
      discriminator,
      userId,
      username
    } = verify(c.event.queryStringParameters!.token!, TOKEN_SECRET) as ContextPayload

    return {
      predictionId,
      userId,
      username,
      discriminator,
      avatar,
    }
  }
});

