import { builder } from "./builder";

// import "./types/article";

builder.queryFields(t => ({
  hello: t.string({
    // type: t.string({}),
    resolve: () => 'hello'
  })
}));

builder.mutationFields(t=>({
  mello: t.string({
    resolve: () => 'mello'
  })
}))

export const schema = builder.toSchema({});

