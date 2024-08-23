export enum DISCORD_API_ROUTES {
    OAUTH2_TOKEN = 'https://discord.com/api/v8/oauth2/token',
    OAUTH2_USER = 'https://discord.com/api/v8/users/@me',
    OAUTH2_TOKEN_REVOKE = 'https://discord.com/api/v8/oauth2/token/revoke',
  }

  export type OAuth2ExchangeRequestParams = {
    client_id: string;
    client_secret: string;
    grant_type: string;
    code: string;
    redirect_uri: string;
  };

  export type DiscordOAuth2CredentialResponse = {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
  }