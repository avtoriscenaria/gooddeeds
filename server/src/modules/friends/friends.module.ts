import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/database/schemas/user.schema';
import { JWTMiddleware } from 'src/middlewares/jwt.middleware';
import { JWT } from 'src/services/jwt.service';

import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    //DatabaseModule
  ],
  controllers: [FriendsController],
  providers: [FriendsService, JWT],
})
export class FriendsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JWTMiddleware).forRoutes('/friends');
  }
}
