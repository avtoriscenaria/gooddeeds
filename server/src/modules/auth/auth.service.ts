import * as argon2 from 'argon2';
import { Injectable } from '@nestjs/common';
import { UserDBService } from 'src/database/services';

@Injectable()
export class AuthService {
  constructor(private userModel: UserDBService) {}

  async createUser(data) {}

  async loginUser(data) {
    console.log('check 2');
    const res = await this.userModel.create({
      name: 'name',
      password: 'password',
    });
    console.log('res', res);
    return { status: 'ok' };
  }
}
