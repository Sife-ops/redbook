import * as subcommand from './subcommand';

export const user = async (body: any) => {
  const name = body.data.options[0].name;

  //@ts-ignore
  return await subcommand[name](body);
};
