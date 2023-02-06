import { Controller, Get, Req, Query, Param, Delete } from '@nestjs/common';

import { FriendsService } from './friends.service';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friends: FriendsService) {}

  @Get('/')
  getFriends(@Req() req) {
    return this.friends.getFriends(req);
  }

  @Get('/search')
  searchFriends(@Req() req, @Query() query) {
    return this.friends.searchFriends(req, query);
  }

  @Get('/add/:friend_id')
  addFriend(@Req() req, @Param() param) {
    return this.friends.addFriend(req, param);
  }

  @Delete('/delete/:friend_id')
  deleteFriend(@Req() req, @Param() param) {
    return this.friends.deleteFriend(req, param);
  }
}
