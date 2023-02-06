import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './modules/auth/auth.module';
import { DeedsModule } from './modules/deeds/deeds.module';
import { FriendsModule } from './modules/friends/friends.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
      useNewUrlParser: true,
    }),
    AuthModule,
    UserModule,
    DeedsModule,
    FriendsModule,
  ],
})
export class AppModule {}
