import { Controller, Get, Req, Delete, Patch, Body } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly user: UserService) {}

  @Get('/')
  getUser(@Req() req) {
    return this.user.getUser(req);
  }

  @Patch('/')
  updateUser(@Req() req, @Body() body) {
    return this.user.updateUser(req, body);
  }

  @Delete('/')
  deleteUser(@Req() req) {
    return this.user.deleteUser(req);
  }
}
