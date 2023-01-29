import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from 'src/database/database.module';
import { UserEntity, UserSchema } from 'src/database/schemas/user.schema';
import { UserDBService } from 'src/database/services';
import { JWT } from 'src/services/jwt.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    DatabaseModule,
    //MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserDBService, JWT],
})
export class AuthModule {}
