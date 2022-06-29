import * as subcommand from './subcommand';
import { runner } from '../../../../utility';

export const predictions = {
  schema: undefined,
  handler: async (body: any) => {
    // console.log(body.data.options[0].options[0].name)
    // throw new Error('stop');
    return await runner(subcommand, body.data.options[0].options[0].name, body);
  },
};
