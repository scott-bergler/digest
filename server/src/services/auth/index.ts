import axios from 'axios';
import {OAuth2ExchangeRequestParams, DISCORD_API_ROUTES, DiscordOAuth2CredentialResponse} from '../../utils/types'
import { authHeaders, buildOAuth2RequestPayload } from '../../utils/helpers';
import { axiosConfig } from '../../utils/constants';


export async function exchangeAccessCodeForCredentials(
    data: OAuth2ExchangeRequestParams
  ) {
    const payload = buildOAuth2RequestPayload(data);
    return axios.post<DiscordOAuth2CredentialResponse>(
      DISCORD_API_ROUTES.OAUTH2_TOKEN,
      payload,
      axiosConfig
    );
  }

export async function getDiscordUserDetails(accessToken:string) {
    return axios.get(DISCORD_API_ROUTES.OAUTH2_USER, authHeaders(accessToken))
}