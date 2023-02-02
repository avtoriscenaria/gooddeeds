import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDBService } from 'src/database/services';
import { JWT } from 'src/services/jwt.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/database/interfaces/user.interface';
import { Deed } from 'src/database/interfaces/deed.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Deed') private readonly deedModel: Model<Deed>,
    private readonly jwt: JWT,
  ) {}

  async getUser(req) {
    const data = this.jwt.decodeToken(req);
    if (!data) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.userModel.findById(data._id, {
      password: 0,
      uuid_key: 0,
    });
    if (user) {
      return { data: user, ok: true };
    }
  }

  async updateUser(req, body) {
    const data = this.jwt.decodeToken(req);
    if (!data) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.userModel.findById(data._id);
    if (user) {
      const { nickname } = body;
      const userWithSuchNickname = await this.userModel.findOne({ nickname });
      if (!userWithSuchNickname) {
        await this.userModel.updateOne({ _id: data._id }, { nickname });
        return { ok: true };
      }
      throw new HttpException(
        'User with the same nickname exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
  }

  async deleteUser(req) {
    const data = this.jwt.decodeToken(req);
    if (!data) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.userModel.findById(data._id);

    if (user) {
      await this.deedModel.deleteMany({ user_id: user._id });
      await this.userModel.deleteOne({ _id: user._id });

      return { ok: true };
    }
    throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
  }
}
