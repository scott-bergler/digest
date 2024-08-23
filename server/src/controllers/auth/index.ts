import { Request, Response } from "express";
import axios from 'axios'
import url from 'url'
import { discordAccessData } from "../../dummy-data";
import { exchangeAccessCodeForCredentials } from "../../services/auth";

export async function authDiscordRedirectController(
  req: Request,
  res: Response
) {
  const { code } = req.query
  if (code) {
    try { 
     const response = await exchangeAccessCodeForCredentials({
      client_id: process.env.DISCORD_OAUTH_CLIENT_ID as string,
      client_secret: process.env.DISCORD_OAUTH_SECRET as string,
      grant_type: "authorization_code",
      code: code.toString(),
      redirect_uri: process.env.DISCORD_REDIRECT_URL as string
    })
      res.send(response.data)
      console.log(response.data["access_token"])
      console.log(response.data["refresh_token"])
      discordAccessData.accessToken = response.data["access_token"]
      discordAccessData.refreshToken = response.data["refresh_token"]
    } catch (error) {
      console.log(error)
      res.sendStatus(400)
    }
  } else {
    res.sendStatus(500)
  }
}

export async function getAuthenticatedUserController(
  req: Request,
  res: Response
) {
  try {
    const response = await axios.get("https://discord.com/api/v8/users/@me", {
    headers: {"Authorization":` Bearer ${discordAccessData.accessToken}`}
  })
    console.log(response.data)
    res.send(response.data)
  } catch(error){
    console.log(error)
    res.sendStatus(400)
  }
}

/* 
  GET REQUEST TO REVOKE ACCESS HERE

  GET REQUEST TO REFRESH ACCESS TOKEN HERE
  Grant type "refresh_token"
  (Not demo-ed in tutorial) so we'll need to figure out when & why to refresh
  Probably has something to do with sessions

  export async function revokeAccessTokenController(req: Request, res: Response) {
    if (!req.user) return res.sendStatus(401);
    try {
      await revokeToken(req.user.accessToken);
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    } 
  }
*/