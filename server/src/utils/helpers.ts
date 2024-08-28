import url from 'url';
import { OAuth2ExchangeRequestParams} from './types';
import { AxiosRequestConfig } from 'axios';
const {
  DISCORD_OAUTH_CLIENT_ID,
  DISCORD_OAUTH_SECRET,
  DISCORD_REDIRECT_URL,
  ENCRYPT_SECRET,
} = process.env;

export const buildOAuth2RequestPayload = (data: OAuth2ExchangeRequestParams) => new url.URLSearchParams(data).toString();

export const authHeaders = (accessToken: string): AxiosRequestConfig =>({
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
})