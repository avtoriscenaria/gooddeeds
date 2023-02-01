import * as mongodb from 'mongodb';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JWT } from 'src/services/jwt.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/database/interfaces/user.interface';

@Injectable()
export class FriendsService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwt: JWT,
  ) {}

  async getFriends(req) {
    const data = this.jwt.decodeToken(req);
    if (!data) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const user = await this.userModel.findById(data._id);
    const friends = await this.userModel.find(
      {
        _id: { $in: user.friends || [] },
      },
      { password: 0, friends: 0 },
    );

    return {
      ok: true,
      data: friends || [],
    };
  }

  async searchFriends(req, query) {
    const data = this.jwt.decodeToken(req);
    if (!data) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const { nickname } = query;
    const friends = await this.userModel.find(
      {
        nickname: { $regex: new RegExp(nickname, 'i') },
        _id: { $ne: data._id },
      },
      { password: 0, friends: 0, uuid_key: 0 },
    );

    return {
      ok: true,
      data: friends || [],
    };
  }

  async addFriend(req, query) {
    const data = this.jwt.decodeToken(req);
    if (!data) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const { friend_id } = query;
    const user = await this.userModel.findById(data._id);

    await this.userModel.updateOne(
      { _id: data._id },
      {
        friends: [...(user.friends || []), friend_id],
      },
    );
    const newFriend = await this.userModel.findById(
      { _id: friend_id },
      { password: 0, friends: 0, uuid_key: 0 },
    );

    return { ok: true, data: newFriend };
  }

  async deleteFriend(req, query) {
    const data = this.jwt.decodeToken(req);
    if (!data) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const { friend_id } = query;
    const user = await this.userModel.findById(data._id);

    await this.userModel.updateOne(
      { _id: data._id },
      {
        friends: (user.friends || []).filter(
          (_friend_id: string) => _friend_id !== friend_id,
        ),
      },
    );

    return { ok: true };
  }
}
