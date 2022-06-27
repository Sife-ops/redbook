import * as subcommand from './subcommand';
import { runner } from '../../utility';

export const prediction = async (body: any) => {
  return await runner(subcommand, body.data.options[0].name, body);
};
