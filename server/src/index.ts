import * as dotenv from "dotenv";
import express, { Express, Response, Request } from "express";
import cors from "cors";
import axios from 'axios'
import url from 'url'
import {users, discordAccessData} from "./dummy-data"

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;
app.use(cors())
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Elise!!!");
});

app.get("/users", (req: Request, res: Response) => {
  res.json(users)
})

app.post("/users", (req: Request, res: Response) => {
  const user = req.body
  const userFound = users.find((usr) => usr.email === user.email)
  if (!userFound) {
    users.push(user)
    return res.json(user)
  }
  return res.json(userFound)
})

// TODO: create redirect callback endpoint
app.get("/callback", async (req: Request, res: Response) => {
  console.log("CALLBACK RUN:", req.query)
  const { code } = req.query
  if (code) {
    try {
      const formData = new url.URLSearchParams({
        // TODO: Are there issues with declaring the envars as strings? Also, is this casting?
        client_id: process.env.DISCORD_OAUTH_CLIENT_ID as string,
        client_secret: process.env.DISCORD_OAUTH_SECRET as string,
        grant_type: "authorization_code",
        code: code.toString(),
        redirect_uri: process.env.DISCORD_REDIRECT_URL as string
      }) 
      const response = await axios.post("https://discord.com/api/v8/oauth2/token",
        formData.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      )
      res.send(response.data)
      console.log(response.data["access_token"])
      console.log(response.data["refresh_token"])
      discordAccessData.accessToken = response.data["access_token"]
      discordAccessData.refreshToken = response.data["refresh_token"]
    } catch (error) {
      console.log(error)
      res.sendStatus(400)
    }
  }
})

// GET USER DATA WITH ACCESS TOKEN HERE
// Axios GET with headers "Bearer accessToken"

// GET REQUEST TO REVOKE ACCESS HERE

// GET REQUEST TO REFRESH ACCESS TOKEN HERE
// Grant type "refresh_token"
// (Not demo-ed in tutorial) so we'll need to figure out when & why to refresh
// Probably has something to do with sessions

app.listen(port, () => {
  console.info(`Express API server listening on port: ${port}`);
});
