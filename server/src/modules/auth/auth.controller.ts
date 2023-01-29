import { Controller, Post, Put, Body } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Put('/sign-up')
  createUser(
    @Body() signUpData: { email: string; nickname: string; password: string },
  ) {
    console.log('signUpData', signUpData);
    return this.auth.createUser(signUpData);
  }

  @Post('/login')
  loginUser(@Body() loginData: { email: string; password: string }) {
    return this.auth.loginUser(loginData);
  }
}
