import { UserEntityType } from '@redbook/lib/db';
import { builder } from "../builder";

export const UserType = builder
  .objectRef<UserEntityType>("User")
  .implement({
    fields: t => ({
      userId: t.exposeString("userId"),
      username: t.exposeString("username"),
      discriminitor: t.exposeString("discriminator"),
      avatar: t.exposeString("avatar"),
      created_at: t.exposeInt("created_at"),
    })
  })

