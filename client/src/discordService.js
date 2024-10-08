import axios from "axios";

const discordApiUrl = process.env.REACT_APP_DISCORD_API_BASE_URL;
const discordBotToken = process.env.REACT_APP_DISCORD_API_BOT_TOKEN;
const discordUserAgent = process.env.REACT_APP_DISCORD_API_USER_AGENT;

const discordApi = axios.create({
  baseURL: discordApiUrl,
  headers: {
    Authorization: `BOT ${discordBotToken}`,
    "User-Agent": discordUserAgent,
  },
});

// function getUserGuilds() {
//     const guilds = await
// }
