import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { getTokenFromHeader } from 'src/helpers';

@Injectable()
export class JWTMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = getTokenFromHeader(req);
    try {
      jwt.verify(token, process.env.SECRET);
      next();
    } catch (e) {
      throw new HttpException('Token expired', HttpStatus.FORBIDDEN);
    }
  }
}
