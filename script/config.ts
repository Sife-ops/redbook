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
    BOT_TOKEN:
      'OTkwODA0NDU0NjAzMzYyMzA3.GuGXAx.f5QLWRx7p5rsHQeLKHtqHaeI5Ow7Y1pAtQLhLM',
    APP_ID: '990804454603362307',
    GUILD_ID: '977039347348017213',

    POSTGRES_DATABASE: 'postgres00',
    POSTGRES_HOST: '45.77.217.48',
    POSTGRES_PASSWORD: 'postgres00',
    POSTGRES_PORT: 5432,
    POSTGRES_USERNAME: 'postgres00',
  },
  prod: {
    BOT_TOKEN:
      'OTg4OTkwNzY3MTMxMzk4MjI1.GiT6WD.grsaE3I3M9AfzEazyOu7k0BfGFLy7WU_5Yb5uc',
    APP_ID: '988990767131398225',
    GUILD_ID: '977039347348017213',

    POSTGRES_DATABASE: 'redbook',
    POSTGRES_HOST: '45.77.217.48',
    POSTGRES_PASSWORD: 'redbook06081990',
    POSTGRES_PORT: 5433,
    POSTGRES_USERNAME: 'redbook',
  },
};

export default config[REDBOOK_ENV];
