import url from 'url';
import { OAuth2ExchangeRequestParams} from './types';
import { AxiosRequestConfig } from 'axios';
const {
  DISCORD_OAUTH_CLIENT_ID,
  DISCORD_OAUTH_SECRET,
  DISCORD_REDIRECT_URL,
  ENCRYPT_SECRET,
} = process.env;

export const buildOAuth2RequestPayload = (data: OAuth2ExchangeRequestParams) => new url.URLSearchParams({
  client_id: DISCORD_OAUTH_CLIENT_ID || '',
  client_secret: DISCORD_OAUTH_SECRET || '',
  grant_type: 'authorization_code',
  redirect_uri: DISCORD_REDIRECT_URL || '',
  code: '',
}).toString();

export const authHeaders = (accessToken: string): AxiosRequestConfig =>({
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
})