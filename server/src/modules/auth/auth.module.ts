import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { UserDBService } from 'src/database/services';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService, UserDBService],
})
export class AuthModule {}
