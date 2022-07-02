import * as subcommand from './subcommand';
import { runner } from '../../../../utility';

export const judge = {
  schema: undefined,
  handler: async (body: any) => {
    const name = body.data.options[0].options[0].name;
    return await runner(subcommand, name, body);
  },
};
