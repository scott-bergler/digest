import axios from 'axios';
import { OAuth2ExchangeRequestParams, DISCORD_API_ROUTES, DiscordOAuth2CredentialResponse, DiscordOAuth2UserResponse, CreateUserParams } from '../../utils/types'
import { authHeaders, buildOAuth2RequestPayload } from '../../utils/helpers';
import { axiosConfig } from '../../utils/constants';
import { userRepo } from '../../data'

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

export async function createUser(params: CreateUserParams) {
  const dbUser = userRepo.findOne({
      where: {
          discordId: params.discordId,
      },
  })
  if (dbUser) return dbUser
  const newUser = userRepo.create(params)
  return userRepo.save(newUser)
}