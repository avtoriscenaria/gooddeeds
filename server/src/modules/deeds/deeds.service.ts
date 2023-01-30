import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeedDBService } from 'src/database/services';
import { JWT } from 'src/services/jwt.service';

@Injectable()
export class DeedsService {
  constructor(private deedModel: DeedDBService, private readonly jwt: JWT) {}

  async getDeeds(req) {
    const data = this.jwt.decodeToken(req);
    if (!data) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const deeds = await this.deedModel.getAll({ user_id: data._id });

    return deeds || [];
  }

  async updateDeed(req, deedData, params?: any) {
    const data = this.jwt.decodeToken(req);
    if (!data) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    if (params) {
      const { deed_id } = params;

      const deed = await this.deedModel.getById(deed_id);

      if (deed && deed.user_id === data._id) {
        const res = await this.deedModel.update(deed_id, {
          name: deedData.name,
          text: deedData.text,
        });

        return { status: true };
      }
      throw new HttpException('Have not such data', HttpStatus.BAD_REQUEST);
    } else {
      const { name, text } = deedData;

      const deed = await this.deedModel.create({
        name,
        text,
        user_id: data._id,
      });
      console.log('deeds', deed);
    }

    return { status: true };
  }

  async getDeed(req, params) {
    const data = this.jwt.decodeToken(req);
    if (!data) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const { deed_id } = params;

    const deed = await this.deedModel.getById(deed_id);

    if (deed && deed.user_id === data._id) {
      return deed;
    }

    throw new HttpException('Have not such data', HttpStatus.BAD_REQUEST);
  }
}
