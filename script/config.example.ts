const { REDBOOK_ENV } = process.env;

switch (REDBOOK_ENV) {
  case 'dev':
  case 'prod':
    break;
  default:
    throw new Error('invalid REDBOOK_ENV');
}

const config = {
  dev: {
    BOT_TOKEN: '',
    APP_ID: '',
    GUILD_ID: '',
  },
  prod: {
    BOT_TOKEN: '',
    APP_ID: '',
    GUILD_ID: '',
  },
};

export default config[REDBOOK_ENV];
