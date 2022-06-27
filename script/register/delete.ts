import axios from 'axios';
import config from '../config';

const { APP_ID, GUILD_ID, BOT_TOKEN } = config;

const url = `https://discord.com/api/v10/applications/${APP_ID}/guilds/${GUILD_ID}/commands`;

const headers = {
  Authorization: `Bot ${BOT_TOKEN}`,
  'Content-Type': 'application/json',
};

const commandId = process.argv[2];

axios
  .delete(`${url}/${commandId}`, {
    headers: headers,
  })
  .then((e) => {
    // console.log(e.status, e.data);
    console.log(e);
  });
