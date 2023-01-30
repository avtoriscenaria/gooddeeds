import { Controller, Get, Req, Body, Next, Query, Param } from '@nestjs/common';

import { FriendsService } from './friends.service';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friends: FriendsService) {}

  @Get('/')
  getFriends(@Req() reqData) {
    return this.friends.getFriends(reqData);
  }

  @Get('/search')
  searchFriends(@Query() query) {
    return this.friends.searchFriends(query);
  }
}
