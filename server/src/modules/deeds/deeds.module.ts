import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeedSchema } from 'src/database/schemas/deed.schema';
import { JWTMiddleware } from 'src/middlewares/jwt.middleware';
import { JWT } from 'src/services/jwt.service';

import { DeedsController } from './deeds.controller';
import { DeedsService } from './deeds.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Deed', schema: DeedSchema }])],
  controllers: [DeedsController],
  providers: [DeedsService, JWT],
})
export class DeedsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JWTMiddleware).forRoutes('/deeds');
  }
}
