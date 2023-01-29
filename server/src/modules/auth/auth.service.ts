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
    const user = await this.userModel.get({ email });

    if (Boolean(user)) {
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
        const token = await this.jwt.generateToken(user);
        const { _id, nickname, email } = user;

        return {
          token,
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
}
