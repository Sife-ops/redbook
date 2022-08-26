import { UserEntityType } from '@redbook/lib/db';
import { builder } from "../builder";

export const UserType = builder
  .objectRef<UserEntityType>("User")
  .implement({
    fields: t => ({
      userId: t.exposeString("userId"),
      username: t.exposeString("username"),
      discriminator: t.exposeString("discriminator"),
      avatar: t.exposeString("avatar"),
      created_at: t.exposeString("created_at"),
    })
  })

