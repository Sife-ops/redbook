import axios from 'axios';

import { foo } from './foo';
import { prediction } from './prediction';
import { vote } from './vote';

const commands = [foo, prediction, vote];

const { APP_ID, GUILD_ID, BOT_TOKEN } = process.env;
if (!APP_ID || !GUILD_ID || !BOT_TOKEN) {
  throw new Error('variable not defined');
}

const url = `https://discord.com/api/v8/applications/${APP_ID}/guilds/${GUILD_ID}/commands`;

const headers = {
  Authorization: `Bot ${BOT_TOKEN}`,
  'Content-Type': 'application/json',
};

commands.map((e) => {
  axios
    .post(url, JSON.stringify(e), {
      headers: headers,
    })
    .then((e) => {
      console.log(e.status);
    });
});
