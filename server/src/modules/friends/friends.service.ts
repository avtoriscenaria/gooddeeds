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

    //"items.id": { $in: idArray }

    const friends = await this.userModel.getAll({
      subscribers: { $in: [data._id] },
    });
    console.log('friends', friends);
    return friends || [];
  }

  async searchFriends(query) {
    const { nickname } = query;
    const friends = await this.userModel.getAll({
      nickname: { $regex: new RegExp(nickname, 'i') },
    });
    console.log('fre', friends);
    return (friends || []).map((el) => ({ ...el, password: undefined }));
  }
}
