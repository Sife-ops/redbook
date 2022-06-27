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

    POSTGRES_DATABASE: '',
    POSTGRES_HOST: '',
    POSTGRES_PASSWORD: '',
    POSTGRES_PORT: 5432,
    POSTGRES_USERNAME: '',
  },
  prod: {
    BOT_TOKEN: '',
    APP_ID: '',
    GUILD_ID: '',

    POSTGRES_DATABASE: '',
    POSTGRES_HOST: '',
    POSTGRES_PASSWORD: '',
    POSTGRES_PORT: 5433,
    POSTGRES_USERNAME: '',
  },
};

export default config[REDBOOK_ENV];
