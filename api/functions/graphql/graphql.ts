import { createGQLHandler } from "@serverless-stack/node/graphql";
import { schema } from "./schema";
import { verify, JwtPayload } from 'jsonwebtoken';

const { TOKEN_SECRET } = process.env

interface ContextPayload extends JwtPayload {
  userId: string
  username: string
  avatar: string
  discriminator: string
}

export const handler = createGQLHandler({
  schema,
  context: async (c) => {
    // todo: non null assertions
    const token = c.event.queryStringParameters!.token!
    if (token !== 'null') {
      const {
        avatar,
        discriminator,
        userId,
        username
      } = verify(token, TOKEN_SECRET) as ContextPayload

      return {
        userId,
        username,
        discriminator,
        avatar,
      }
    } else {
      return {}
    }
  }
});

