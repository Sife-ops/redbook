import axios from "axios";

const { APP_ID, GUILD_ID, BOT_TOKEN } = process.env;
if (!APP_ID || !GUILD_ID || !BOT_TOKEN) {
  throw new Error("variable not defined");
}

let url = `https://discord.com/api/v8/applications/${APP_ID}/guilds/${GUILD_ID}/commands`;

const headers = {
  Authorization: `Bot ${BOT_TOKEN}`,
  "Content-Type": "application/json",
};

let command_data = {
  name: "foo",
  type: 1,
  description: "replies with bar",
};

axios
  .post(url, JSON.stringify(command_data), {
    headers: headers,
  })
  .then((e) => console.log(e));
