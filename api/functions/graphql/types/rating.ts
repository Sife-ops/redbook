import { builder } from "../builder";
import { RatingEntityType, } from '@redbook/lib/db';

export const RatingType = builder
  .objectRef<RatingEntityType>("Rating")
  .implement({
    fields: t => ({
      predictionId: t.exposeID("predictionId"),
      commentId: t.exposeID("commentId"),

      criticId: t.exposeString("criticId"),
      avatar: t.exposeString("avatar"),
      discriminator: t.exposeString("discriminator"),
      username: t.exposeString("username"),

      // like: t.exposeBoolean("like"),
    })
  })

