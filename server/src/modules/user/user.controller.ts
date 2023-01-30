import { Controller, Get, Req, Body, Next } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly user: UserService) {}

  @Get('/')
  getUser(@Req() reqData) {
    return this.user.getUser(reqData);
  }
}
