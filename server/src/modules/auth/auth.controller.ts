import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('/sign_up')
  createUser(@Body() signUpData: any) {
    return this.auth.createUser(signUpData);
  }

  @Post('/login')
  loginUser(@Body() loginData: any) {
    console.log('check');
    return this.auth.loginUser(loginData);
  }
}
