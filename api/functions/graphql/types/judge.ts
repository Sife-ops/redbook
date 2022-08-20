import { builder } from "../builder";

import { JudgeEntityType, } from '@redbook/lib/db';

export const JudgeType = builder
  .objectRef<JudgeEntityType>("Judge")
  .implement({
    fields: t => ({
      predictionId: t.exposeString("predictionId"),

      judgeId: t.exposeID("judgeId"),
      avatar: t.exposeString("username"),
      username: t.exposeString("username"),
      discriminator: t.exposeString("discriminator"),

      verdict: t.exposeBoolean("verdict", { nullable: true })
    })
  })


