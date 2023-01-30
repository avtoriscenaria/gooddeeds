import { MiddlewareConsumer, Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { DeedDBService } from 'src/database/services';
import { JWTMiddleware } from 'src/middlewares/jwt.middleware';
import { JWT } from 'src/services/jwt.service';

import { DeedsController } from './deeds.controller';
import { DeedsService } from './deeds.service';

@Module({
  imports: [DatabaseModule],
  controllers: [DeedsController],
  providers: [DeedsService, DeedDBService, JWT],
})
export class DeedsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JWTMiddleware).forRoutes('/deeds');
  }
}
