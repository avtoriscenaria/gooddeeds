import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { getTokenFromHeader } from 'src/helpers';

@Injectable()
export class JWT {
  constructor() {}

  async generateToken(data) {
    const signature = process.env.SECRET;
    const expiration_access = process.env.EXPIRATION_ACCESS_JWT;
    const expiration_refresh = process.env.EXPIRATION_REFRESH_JWT;

    const access_token = jwt.sign({ data }, signature, {
      expiresIn: expiration_access,
    });
    const refresh_token = jwt.sign({ data }, signature, {
      expiresIn: expiration_refresh,
    });

    return { access_token, refresh_token };
  }

  decodeToken(req) {
    const token = getTokenFromHeader(req);
    try {
      const { data }: any = jwt.decode(token);
      return data;
    } catch (e) {
      return null;
    }
  }
}
