import * as command from './command';
import axios from 'axios';
import config from '../config';

const { APP_ID, GUILD_ID, BOT_TOKEN } = config;

const url = `https://discord.com/api/v10/applications/${APP_ID}/guilds/${GUILD_ID}/commands`;

const headers = {
  Authorization: `Bot ${BOT_TOKEN}`,
  'Content-Type': 'application/json',
};

Object.keys(command).map((e) => {
  axios
    //@ts-ignore
    .post(url, JSON.stringify(command[e]), {
      headers: headers,
    })
    .then((e) => {
      console.log(e.status, e.data);
    });
});
