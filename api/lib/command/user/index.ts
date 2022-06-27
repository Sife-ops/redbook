import * as subcommands from './subcommand';
import { runner } from '../../utility';

export const user = async (body: any) => {
  return await runner(subcommands, body.data.options[0].name, body);
};
