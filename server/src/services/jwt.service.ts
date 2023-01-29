import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JWT {
  constructor() {}

  async generateToken(user) {
    const data = {
      _id: user._id,
      nickname: user.nickname,
      email: user.email,
    };

    const signature = process.env.SECRET;
    const expiration = process.env.EXPIRATION_JWT;

    return jwt.sign({ data }, signature, {
      expiresIn: expiration,
    });
  }

  async checkAuthToken(token) {
    try {
      jwt.verify(token, process.env.SECRET);
      return true;
    } catch (e) {
      return false;
    }
  }
}
