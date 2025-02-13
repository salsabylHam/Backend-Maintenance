import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AuthConfig } from 'src/auth-config/entities/auth-config.entity';

@Injectable()
export class AuthProviderService {
  constructor() {}

  async getProfile(
    userInfoURL: string,
    access_token: string,
    options?: {
      token_type?: string;
    },
  ) {
    let _token_type = 'Bearer';
    if (options && options.token_type) _token_type = options.token_type;
    let url = new URL(userInfoURL);
    url.search = new URLSearchParams({
      alt: 'json',
    }).toString();
    const profile = await fetch(userInfoURL, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        Authorization: `${_token_type} ${access_token}`,
      },
    });
    try {
      const profileData = await profile.json();
      return profileData;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }
  getAuthorizationUrl(state: string, authProvider: AuthConfig): string {
    return `${authProvider.authorizationURL}?client_id=${
      authProvider.clientID
    }&redirect_uri=${encodeURIComponent(
      authProvider.callbackURL,
    )}&response_type=code&scope=${authProvider.scope}&state=${state}`;
  }

  async fetchToken(code: string, authProvider: AuthConfig): Promise<any> {
    const tokenResponse = await fetch(authProvider.tokenURL, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: authProvider.callbackURL,
        client_id: authProvider.clientID,
        client_secret: authProvider.clientSecret,
      }),
    });
    try {
      if (!tokenResponse.ok) {
        throw new Error('Failed to fetch token');
      }

      const data = await tokenResponse.json();
      return data;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }
}
