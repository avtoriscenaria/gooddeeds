import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Deed } from 'src/database/interfaces/deed.interface';
import { JWT } from 'src/services/jwt.service';

@Injectable()
export class DeedsService {
  constructor(
    @InjectModel('Deed') private readonly deedModel: Model<Deed>,
    private readonly jwt: JWT,
  ) {}

  async getDeeds(req, params?: any) {
    let _user_id = '';
    if (params) {
      const { user_id } = params;
      _user_id = user_id;
    } else {
      const data = this.jwt.decodeToken(req);
      if (!data) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
      _user_id = data._id;
    }

    const deeds = await this.deedModel.find({ user_id: _user_id });

    return {
      ok: true,
      data: deeds || [],
    };
  }

  async updateDeed(req, deedData, params?: any) {
    const data = this.jwt.decodeToken(req);
    if (!data) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    if (params) {
      const { deed_id } = params;

      const deed = await this.deedModel.findById(deed_id);

      if (deed && deed.user_id === data._id) {
        const res = await this.deedModel.updateOne(
          { _id: deed_id },
          {
            name: deedData.name,
            text: deedData.text,
          },
        );

        return { ok: true };
      }
      throw new HttpException('Have not such data', HttpStatus.BAD_REQUEST);
    } else {
      const { name, text } = deedData;

      const deed = await this.deedModel.create({
        name,
        text,
        user_id: data._id,
      });

      console.log('deed', deed);

      return { ok: true, data: { _id: deed._id } };
    }
  }

  async getDeed(req, params) {
    const data = this.jwt.decodeToken(req);
    if (!data) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const { deed_id } = params;
    console.log('iid', deed_id);
    const deed = await this.deedModel.findById(deed_id);
    console.log('deed', deed);
    if (deed && deed.user_id === data._id) {
      return { ok: true, data: deed };
    }

    throw new HttpException('Have not such data', HttpStatus.BAD_REQUEST);
  }

  async deleteDeed(req, params) {
    const data = this.jwt.decodeToken(req);
    if (!data) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const { deed_id } = params;
    const deed = await this.deedModel.findById(deed_id);

    if (deed && deed.user_id === data._id) {
      console.log('DELETE');
    }

    return { ok: true };
  }
}
