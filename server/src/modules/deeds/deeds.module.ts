import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from 'src/database/database.module';
import { DeedSchema } from 'src/database/schemas/deed.schema';
import { DeedDBService } from 'src/database/services';
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
