import * as subcommand from './subcommand';
import { runner } from '../../utility';

export const user = {
  schema: undefined,
  handler: async (body: any) => {
    return await runner(subcommand, body.data.options[0].name, body);
  },
};
