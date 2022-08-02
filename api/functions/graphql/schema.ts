import { builder } from "./builder";

// import "./types/article";

builder.queryFields(t => ({
  hello: t.string({
    // type: t.string({}),
    resolve: () => 'hello'
  })
}));

export const schema = builder.toSchema({});

