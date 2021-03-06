import * as subcommand from './subcommand';
import { runner } from '@redbook/lib/utility';

export const predictions = {
  schema: undefined,
  handler: async (body: any) => {
    return await runner(subcommand, body.data.options[0].options[0].name, body);
  },
};
