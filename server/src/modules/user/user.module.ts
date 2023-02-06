import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeedSchema } from 'src/database/schemas/deed.schema';
import { UserSchema } from 'src/database/schemas/user.schema';
import { JWTMiddleware } from 'src/middlewares/jwt.middleware';
import { JWT } from 'src/services/jwt.service';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Deed', schema: DeedSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, JWT],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JWTMiddleware).forRoutes('/user');
  }
}
