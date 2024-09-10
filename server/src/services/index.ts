import axios from 'axios';
import { 
  DISCORD_API_ROUTES, 
  OAuth2ExchangeRequestParams, 
  DiscordOAuth2CredentialResponse, 
  DiscordOAuth2UserResponse, 
  CreateDiscordUserParams
} from '../utils/types'
import { authHeaders, buildOAuth2RequestPayload } from '../utils/helpers';
import { axiosConfig } from '../utils/constants';
import { discordUserRepo, appUserRepo } from '../data/data'

export async function exchangeAccessCodeForCredentials(data: OAuth2ExchangeRequestParams) {
  const payload = buildOAuth2RequestPayload(data);
  return axios.post<DiscordOAuth2CredentialResponse>(
    DISCORD_API_ROUTES.OAUTH2_TOKEN,
    payload,
    axiosConfig
  );
}

export async function getDiscordUserDetails(accessToken:string) {
    return axios.get<DiscordOAuth2UserResponse>(DISCORD_API_ROUTES.OAUTH2_USER, authHeaders(accessToken))
}

export async function createDiscordUser(params: CreateDiscordUserParams) {
  const dbUser = await discordUserRepo.findOne({
      where: {
          discordId: params.discordId,
      },
  })
  if (dbUser) return dbUser
  const newUser = discordUserRepo.create(params)
  return discordUserRepo.save(newUser)
}

export async function createAppUser(params: any) {
  const user = await appUserRepo.findOne({
    where: {
      email: params.email
    }
  })
  if (user) return user
  const newUser = appUserRepo.create(params)
  return appUserRepo.save(newUser)
}