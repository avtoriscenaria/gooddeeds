import * as mongodb from 'mongodb';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDBService } from 'src/database/services';
import { JWT } from 'src/services/jwt.service';

@Injectable()
export class FriendsService {
  constructor(private userModel: UserDBService, private readonly jwt: JWT) {}

  async getFriends(req) {
    const data = this.jwt.decodeToken(req);
    if (!data) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.userModel.getById(data._id);

    const friends = await this.userModel.getAll({
      _id: { $in: user.friends || [] },
    });
    return {
      ok: true,
      data: (friends || []).map((el) => ({ ...el, password: undefined })),
    };
  }

  async searchFriends(query) {
    const { nickname } = query;
    const friends = await this.userModel.getAll({
      nickname: { $regex: new RegExp(nickname, 'i') },
    });
    console.log('fre', friends);
    return {
      ok: true,
      data: (friends || []).map((el) => ({ ...el, password: undefined })),
    };
  }

  async addFriend(req, query) {
    const data = this.jwt.decodeToken(req);
    if (!data) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const { friend_id } = query;
    const user = await this.userModel.getById(data._id);

    const upd = await this.userModel.update(data._id, {
      friends: [...(user.friends || []), new mongodb.ObjectID(friend_id)],
    });
    return { ok: true };
  }
}
