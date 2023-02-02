import * as argon2 from 'argon2';
import { v4 as uuidv4 } from 'uuid';
import * as jwt from 'jsonwebtoken';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDBService } from 'src/database/services';
import { JWT } from 'src/services/jwt.service';
import { getTokenFromHeader } from 'src/helpers';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/database/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwt: JWT,
  ) {}

  async createUser({
    email,
    nickname,
    password,
  }: {
    email: string;
    nickname: string;
    password: string;
  }) {
    const user = await this.userModel.findOne({
      $or: [{ email }, { nickname }],
    });
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
      return { ok: true };
    }
  }

  async loginUser({ email, password }: { email: string; password: string }) {
    console.log('check 2', email, password);
    const user = await this.userModel.findOne({ email });
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
        const uuid_key = uuidv4();
        await this.userModel.updateOne({ _id: user._id }, { uuid_key });
        const tokens = await this.jwt.generateToken(payload, uuid_key);

        const { _id, nickname, email } = user;

        return {
          ok: true,
          data: {
            ...tokens,
            user: { _id, nickname, email },
          },
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

    const user = await this.userModel.findById(data._id);
    if (user) {
      const refresh_token = getTokenFromHeader(req);
      try {
        console.log('refresh_token', refresh_token);
        console.log('uuid_key', user.uuid_key);
        jwt.verify(refresh_token, user.uuid_key);
      } catch (e) {
        console.log('error', e);
        await this.userModel.updateOne({ _id: data._id }, { uuid_key: null });
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
      const uuid_key = uuidv4();
      await this.userModel.updateOne({ _id: data._id }, { uuid_key });
      const tokens = await this.jwt.generateToken(data, uuid_key);

      return { ok: true, data: tokens };
    }
    //throw new HttpException('refresh broken', HttpStatus.BAD_REQUEST);
  }

  async logout(req) {
    const data = this.jwt.decodeToken(req);
    if (!data) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.userModel.findById(data._id);
    if (user) {
      await this.userModel.updateOne({ _id: data._id }, { uuid_key: null });

      return { ok: true };
    }
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }
}
