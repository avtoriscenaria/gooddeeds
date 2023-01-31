import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDBService } from 'src/database/services';
import { JWT } from 'src/services/jwt.service';

@Injectable()
export class UserService {
  constructor(private userModel: UserDBService, private readonly jwt: JWT) {}

  async getUser(req) {
    const data = this.jwt.decodeToken(req);
    if (!data) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.userModel.getById(data._id);
    if (user) {
      const { _id, email, nickname } = user;

      return { data: { _id, email, nickname }, ok: true };
    }
  }
}
