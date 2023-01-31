import { Controller, Get, Req, Body, Next, Query, Param } from '@nestjs/common';

import { FriendsService } from './friends.service';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friends: FriendsService) {}

  @Get('/')
  getFriends(@Req() req) {
    return this.friends.getFriends(req);
  }

  @Get('/search')
  searchFriends(@Query() query) {
    return this.friends.searchFriends(query);
  }

  @Get('/add/:friend_id')
  addFriend(@Req() req, @Param() param) {
    return this.friends.addFriend(req, param);
  }
}
