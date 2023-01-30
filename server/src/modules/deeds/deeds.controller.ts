import { Controller, Get, Req, Put, Body, Param, Patch } from '@nestjs/common';

import { DeedsService } from './deeds.service';

@Controller('deeds')
export class DeedsController {
  constructor(private readonly deeds: DeedsService) {}

  @Get('/')
  getDeeds(@Req() reqData) {
    return this.deeds.getDeeds(reqData);
  }

  @Put('/')
  addDeed(@Req() reqData, @Body() deedData) {
    return this.deeds.updateDeed(reqData, deedData);
  }

  @Patch('/:deed_id')
  updateDeed(@Req() reqData, @Body() deedData, @Param() reqParam) {
    return this.deeds.updateDeed(reqData, deedData, reqParam);
  }

  @Get('/:deed_id')
  getDeed(@Req() reqData, @Param() reqParam) {
    return this.deeds.getDeed(reqData, reqParam);
  }
}
