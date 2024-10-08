import { Request, Response } from "express";
import axios from 'axios'
import { discordAccessData } from "../data/dummy-data";
import { createAppUser, createDiscordUser, exchangeAccessCodeForCredentials, getDiscordUserDetails } from "../services";

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
      const { access_token, refresh_token } = response.data
      const { data: user} = await getDiscordUserDetails(access_token)
      const { id } = user
      const discordUser = await createDiscordUser({discordId: id, accessToken: access_token, refreshToken: refresh_token})
      res.send(discordUser)
    } catch (error) {
      console.log(error)
      res.sendStatus(400)
    }
  } else {
    res.sendStatus(500)
  }
}

// Not currently in use. May or may not be necessary.
export async function getAuthenticatedDiscordUserController(
  req: Request,
  res: Response
) {
  try {
    const response = await axios.get("https://discord.com/api/v8/users/@me", {
    headers: {"Authorization":` Bearer ${discordAccessData.accessToken}`}
  })
    res.send(response.data)
  } catch(error){
    console.log(error)
    res.sendStatus(400)
  }
}

export async function userLoginController(req: Request, res: Response) {
  const data = req.body
  const appUser = await createAppUser({google_id: data.id, name: data.name, email: data.email})
  res.send(appUser)
}