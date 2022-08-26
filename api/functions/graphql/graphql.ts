import { createGQLHandler } from "@serverless-stack/node/graphql";
import { redbookModel } from '@redbook/lib/db';
import { schema } from "./schema";
import { verify, JwtPayload } from 'jsonwebtoken';

const { TOKEN_SECRET } = process.env;

interface ContextPayload extends JwtPayload {
  userId: string
  username: string
  avatar: string
  discriminator: string
}

export const handler = createGQLHandler({
  schema,
  context: async (c) => {
    const token = c.event.queryStringParameters?.token;

    if (token) {
      const { userId } = verify(token, TOKEN_SECRET) as ContextPayload;

      const user = await redbookModel
        .entities
        .UserEntity
        .query
        .user({
          userId,
        })
        .go();

      return {
        user,
      }
    } else {
      return {};
    }
  }
});

