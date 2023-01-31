import {
  Controller,
  Get,
  Req,
  Put,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { DeedsService } from './deeds.service';

@Controller('deeds')
export class DeedsController {
  constructor(private readonly deeds: DeedsService) {}

  @Get('/')
  getUserDeeds(@Req() req) {
    return this.deeds.getDeeds(req);
  }

  @Get('/:user_id')
  getDeeds(@Req() req, @Param() params) {
    return this.deeds.getDeeds(req, params);
  }

  @Put('/')
  addDeed(@Req() req, @Body() body) {
    return this.deeds.updateDeed(req, body);
  }

  @Patch('/:deed_id')
  updateDeed(@Req() req, @Body() body, @Param() params) {
    return this.deeds.updateDeed(req, body, params);
  }

  @Delete('/:deed_id')
  deleteDeed(@Req() req, @Param() params) {
    return this.deeds.deleteDeed(req, params);
  }

  @Get('/deed/:deed_id')
  getDeed(@Req() req, @Param() params) {
    return this.deeds.getDeed(req, params);
  }
}
