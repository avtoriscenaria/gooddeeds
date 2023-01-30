import { MiddlewareConsumer, Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserDBService } from 'src/database/services';
import { JWTMiddleware } from 'src/middlewares/jwt.middleware';
import { JWT } from 'src/services/jwt.service';

import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';

@Module({
  imports: [DatabaseModule],
  controllers: [FriendsController],
  providers: [FriendsService, UserDBService, JWT],
})
export class FriendsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JWTMiddleware).forRoutes('/friends');
  }
}
