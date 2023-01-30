import * as argon2 from 'argon2';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDBService } from 'src/database/services';
import { JWT } from 'src/services/jwt.service';

@Injectable()
export class AuthService {
  constructor(private userModel: UserDBService, private readonly jwt: JWT) {}

  async createUser({
    email,
    nickname,
    password,
  }: {
    email: string;
    nickname: string;
    password: string;
  }) {
    const user = await this.userModel.get({ $or: [{ email }, { nickname }] });
    console.log('user', user);
    if (user) {
      throw new HttpException(
        'Such user already exists',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const passwordHashed = await argon2.hash(password);
      const res = await this.userModel.create({
        email,
        nickname,
        password: passwordHashed,
      });
      console.log('res', res);
      return { status: 'ok' };
    }
  }

  async loginUser({ email, password }: { email: string; password: string }) {
    console.log('check 2', email, password);
    const user = await this.userModel.get({ email });
    console.log('res', user);
    if (user) {
      const isPasswordCorrect = await argon2.verify(user.password, password);
      console.log('isPasswordCorrect', isPasswordCorrect);
      if (isPasswordCorrect) {
        const payload = {
          _id: user._id,
          nickname: user.nickname,
          email: user.email,
        };
        const tokens = await this.jwt.generateToken(payload);

        const { _id, nickname, email } = user;

        return {
          ...tokens,
          user: { _id, nickname, email },
        };
      } else {
        throw new HttpException(
          'Email or password is wrong',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      throw new HttpException(
        'Email or password is wrong',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async refresh(req) {
    const data = this.jwt.decodeToken(req);
    if (!data) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const tokens = await this.jwt.generateToken(data);
    console.log('tokens', tokens);

    return { status: true, ...tokens };
  }
}
