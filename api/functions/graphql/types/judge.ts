import { JudgeEntityType, } from '@redbook/lib/db';
import { builder } from "../builder";

export const JudgeType = builder
  .objectRef<JudgeEntityType>("Judge")
  .implement({
    fields: t => ({
      predictionId: t.exposeString("predictionId"),

      judgeId: t.exposeID("judgeId"),
      avatar: t.exposeString("avatar"),
      username: t.exposeString("username"),
      discriminator: t.exposeString("discriminator"),

      verdict: t.exposeString("verdict"),
    })
  })


